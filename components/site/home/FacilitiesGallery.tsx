import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";
import { siteImages } from "@/lib/images";

const galleryItems = [
  { image: "/1.png", tag: "Flagship Product", caption: "LC Sodium Buck 12V VRLA Battery", span: "lg:col-span-2 lg:row-span-2" },
  { image: siteImages.factoryLine, tag: "Manufacturing", caption: "Production Line — Battery Assembly", span: "" },
  { image: "/10.jpg", tag: "Lithium Batteries", caption: "Performance Series — Cell Testing", span: "" },
  { image: siteImages.evCharging, tag: "EV Components", caption: "EV Charging & Drivetrain Hardware", span: "" },
  { image: siteImages.solarField, tag: "Renewable", caption: "Solar & Energy Storage Site", span: "" },
  { image: siteImages.automotiveWorkshop, tag: "Automotive", caption: "Component Testing Workshop", span: "lg:col-span-2" },
  { image: "/16.jpg", tag: "Lithium Batteries", caption: "Eco Series — Sealed VRLA Cells", span: "" },
];

export function FacilitiesGallery() {
  return (
    <section className="relative overflow-hidden border-t border-border-hairline py-20 md:py-28">
      <Container>
        <Reveal className="mb-14 max-w-2xl md:mb-16">
          <SectionLabel>Behind The Supply Chain</SectionLabel>
          <h2 className="text-editorial font-bold uppercase text-white">
            Our Global <span className="text-gradient-gold">Operations.</span>
          </h2>
          <p className="mt-5 text-ink-muted leading-relaxed">
            From battery assembly to production lines &mdash; a look inside the
            facilities that build automotive parts and battery systems from source to
            shipment.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:auto-rows-[220px]">
          {galleryItems.map((item, i) => (
            <Reveal
              key={item.caption}
              delay={((i % 4) + 1) as 1 | 2 | 3 | 4}
              className={`group relative overflow-hidden rounded-3xl border border-border ${item.span}`}
            >
              <div className="relative h-56 w-full lg:h-full">
                <Image
                  src={item.image}
                  alt={item.caption}
                  fill
                  sizes="(max-width: 1024px) 100vw, 25vw"
                  className="object-cover transition-transform duration-700 ease-premium group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                <div className="absolute bottom-5 left-5 right-5">
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-gold-bright">{item.tag}</p>
                  <p className="mt-1 text-sm font-semibold text-white md:text-base">{item.caption}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
