import DiagonalLscsBg from '@/components/diagonal-lscs-bg';
import AboutSection from '../molecules/about-section';

export default function WhoAreWeTemplate() {
  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8 relative">
      <DiagonalLscsBg />
      <AboutSection
        title="WHO ARE WE?"
        subtitle="La Salle Computer Society"
        description="La Salle Computer Society (LSCS) is DLSU's largest and pioneering technological organization and the home organization of the College of Computer Studies. LSCS is committed to help students learn more about tech through interactive workshops, make new friends with recreational events, develop their leadership skills through the esteemed Junior Officer Training program, secure a job through various career events, and more. Now in its 40th year of service, LSCS continues to ignite, innovate, and inspire."
        imageUrl="https://blocks.astratic.com/img/general-img-square.png"
        imageAlt="Placeholder network illustration"
        buttonText="Learn More"
      />
    </div>
  );
}
