import PageHeader from '@/features/press-release/components/page-header';
import FeaturedArticleSection from '@/features/press-release/containers/featured-article-section';
import PressReleaseView from '@/features/press-release/containers/press-release-view';
import WhiteDiagonalLscsBg from '@/components/white-diagonal-lscs-bg';

export const revalidate = 3600; // ISR: Revalidate every 60 seconds

export default function PressReleasePage() {
  return (
    <div className="relative min-h-screen bg-linear-to-b from-[#002D57] to-[#1A5D89] text-white overflow-hidden">
      <WhiteDiagonalLscsBg />

      <div className="relative z-10">
        <div className="">
          <PageHeader />
          <FeaturedArticleSection />
        </div>
        <PressReleaseView />
      </div>
    </div>
  );
}
