import DiagonalLscsBg from '@/components/diagonal-lscs-bg';
import AboutSection from '../molecules/about-section';

export default function WhoAreWeTemplate() {
  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8 relative">
      <DiagonalLscsBg />
      <AboutSection
        title="WHO ARE WE?"
        subtitle="La Salle Computer Society"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin viverra, eros nec commodo semper, massa ipsum consequat risus, non efficitur tellus orci id nunc. Praesent nec eros cursus, pellentesque libero eu, finibus tortor. Ut at odio eu turpis sollicitudin tincidunt. Nulla pellentesque, augue cursus pretium laoreet, velit dui mollis felis, ac efficitur quam erat id massa."
        imageUrl="https://blocks.astratic.com/img/general-img-square.png"
        imageAlt="Placeholder network illustration"
        buttonText="Learn More"
      />
    </div>
  );
}
