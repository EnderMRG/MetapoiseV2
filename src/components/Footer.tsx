import Link from "next/link";

export default function Footer({ className }: { className?: string }) {
  return (
    <footer className={`py-12 px-4 sm:px-8 md:px-16 border-t-4 flex flex-col md:flex-row justify-between items-center gap-8 ${className || "grid-line"}`}>
      <div className="flex flex-col items-center md:items-start text-center md:text-left gap-1">
        <span className="mono-font text-xs uppercase font-bold">© 2026 METAPOISE</span>
        <a href="mailto:metapoiseofficial@gmail.com" className="mono-font text-xs font-bold uppercase hover:text-accent transition-colors underline decoration-2 underline-offset-4 mb-2">
          metapoiseofficial@gmail.com
        </a>
        <span className="mono-font text-[10px] uppercase text-white/50 font-bold">
          VER: 2.0_BETA // INDEX_MP_v_2.0 // END
        </span>
      </div>

      <div className="flex flex-wrap gap-6 sm:gap-12 justify-center">
        <Link
          href="https://www.instagram.com/metapoise_official?stkn=MXV6ZmJ0NmtibnZpdQ=="
          target="_blank"
          className="hover:text-accent transition-colors uppercase mono-font text-sm font-bold tracking-widest border-b-2 border-transparent hover:border-accent"
        >
          Instagram
        </Link>
        <Link
          href="https://youtube.com/@metapoiseoffical?si=3Vu56nNAayM4uaxw"
          target="_blank"
          className="hover:text-accent transition-colors uppercase mono-font text-sm font-bold tracking-widest border-b-2 border-transparent hover:border-accent"
        >
          YouTube
        </Link>
        <Link
          href="https://www.facebook.com/share/1HgtKoAj4w/"
          target="_blank"
          className="hover:text-accent transition-colors uppercase mono-font text-sm font-bold tracking-widest border-b-2 border-transparent hover:border-accent"
        >
          Facebook
        </Link>
      </div>

      <div className="text-center md:text-right flex items-center justify-center md:justify-end gap-4">
        <span className="mono-font text-xs uppercase text-white/50 font-bold">
          Secure Connection: True
        </span>
      </div>
    </footer>
  );
}
