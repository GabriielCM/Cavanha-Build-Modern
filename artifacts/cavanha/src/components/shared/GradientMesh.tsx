
export function GradientMesh() {
  return (
    <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 0 }}>
      {/* Base */}
      <div className="absolute inset-0 bg-[#f8fafc]" />
      {/* Blob 1 — Navy */}
      <div
        className="absolute rounded-full"
        style={{
          width: "40vw",
          height: "40vw",
          top: "10%",
          left: "10%",
          background: "radial-gradient(circle, rgba(13,43,92,0.06) 0%, rgba(13,43,92,0) 70%)",
          animation: "meshBlob1 20s ease-in-out infinite",
          willChange: "transform",
        }}
      />
      {/* Blob 2 — Orange */}
      <div
        className="absolute rounded-full"
        style={{
          width: "35vw",
          height: "35vw",
          top: "40%",
          right: "5%",
          background: "radial-gradient(circle, rgba(245,132,31,0.05) 0%, rgba(245,132,31,0) 70%)",
          animation: "meshBlob2 25s ease-in-out infinite",
          willChange: "transform",
        }}
      />
      {/* Blob 3 — Light blue */}
      <div
        className="absolute rounded-full"
        style={{
          width: "30vw",
          height: "30vw",
          bottom: "5%",
          left: "30%",
          background: "radial-gradient(circle, rgba(26,64,128,0.04) 0%, rgba(26,64,128,0) 70%)",
          animation: "meshBlob3 22s ease-in-out infinite",
          willChange: "transform",
        }}
      />
    </div>
  );
}
