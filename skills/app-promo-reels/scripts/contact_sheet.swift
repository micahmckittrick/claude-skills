// Contact sheet of a video: one thumbnail every <step> seconds, labelled with its time.
// Use it to find clip times in a recording, and to review a rendered reel. macOS only.
// usage: swift contact_sheet.swift <video> <out.png> <step-seconds> [cols] [thumbWidth]
import AVFoundation
import AppKit

let args = CommandLine.arguments
guard args.count >= 3 else {
    print("usage: swift contact_sheet.swift <video> <out.png> [step-seconds] [cols] [thumbWidth]")
    exit(2)
}
let url = URL(fileURLWithPath: args[1])
let out = args[2]
let step = args.count > 3 ? (Double(args[3]) ?? 2) : 2
let cols = args.count > 4 ? Int(args[4])! : 8
let tw = args.count > 5 ? CGFloat(Double(args[5])!) : 160

let asset = AVURLAsset(url: url)
let dur = CMTimeGetSeconds(asset.duration)
let gen = AVAssetImageGenerator(asset: asset)
gen.appliesPreferredTrackTransform = true
gen.requestedTimeToleranceBefore = .zero
gen.requestedTimeToleranceAfter = .zero
gen.maximumSize = CGSize(width: tw * 2, height: tw * 5)

var images: [(Double, CGImage)] = []
var t = 0.0
while t < dur {
    if let img = try? gen.copyCGImage(at: CMTime(seconds: t, preferredTimescale: 600), actualTime: nil) {
        images.append((t, img))
    }
    t += step
}
guard let first = images.first?.1 else { exit(1) }
let th = tw * CGFloat(first.height) / CGFloat(first.width)
let rows = (images.count + cols - 1) / cols
let W = Int(tw) * cols, H = Int(th + 22) * rows
let ctx = CGContext(data: nil, width: W, height: H, bitsPerComponent: 8, bytesPerRow: 0,
                    space: CGColorSpaceCreateDeviceRGB(), bitmapInfo: CGImageAlphaInfo.premultipliedLast.rawValue)!
ctx.setFillColor(CGColor(gray: 0.15, alpha: 1)); ctx.fill(CGRect(x: 0, y: 0, width: W, height: H))
NSGraphicsContext.current = NSGraphicsContext(cgContext: ctx, flipped: false)
for (i, (t, img)) in images.enumerated() {
    let c = i % cols, r = i / cols
    let x = CGFloat(c) * tw, y = CGFloat(H) - CGFloat(r + 1) * (th + 22)
    ctx.draw(img, in: CGRect(x: x + 2, y: y, width: tw - 4, height: th))
    (String(format: "%.1fs", t) as NSString).draw(at: CGPoint(x: x + 6, y: y + th + 3),
        withAttributes: [.font: NSFont.boldSystemFont(ofSize: 15), .foregroundColor: NSColor.yellow])
}
try! NSBitmapImageRep(cgImage: ctx.makeImage()!).representation(using: .png, properties: [:])!
    .write(to: URL(fileURLWithPath: out))
print("\(images.count) frames, \(String(format: "%.1f", dur))s -> \(out)")
