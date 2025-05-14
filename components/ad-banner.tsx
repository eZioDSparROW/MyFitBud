interface AdBannerProps {
  position: "top" | "bottom" | "sidebar"
}

export function AdBanner({ position }: AdBannerProps) {
  return (
    <div
      className={`w-full bg-gray-100 rounded-lg p-4 text-center ${position === "sidebar" ? "h-full min-h-[600px]" : "h-[120px]"} flex items-center justify-center`}
    >
      <div className="text-gray-500">
        <p>Advertisement</p>
        <div id={`ad-${position}`} className="w-full h-full">
          {/* Google AdSense will be inserted here via client-side script */}
        </div>
      </div>
    </div>
  )
}
