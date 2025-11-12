import PageHeader from '@/features/press-release/components/page-header';
import FeaturedArticleSection from '@/features/press-release/containers/featured-article-section';
import PressReleaseView from '@/features/press-release/containers/press-release-view';
import WhiteDiagonalLscsBg from '@/components/white-diagonal-lscs-bg';

export default function PressReleasePage() {
  return (
    <div className="relative min-h-screen bg-[#001F3F] text-white overflow-hidden">
      <WhiteDiagonalLscsBg />

      <div className="relative z-10">
        <PageHeader />
        <FeaturedArticleSection />
        <PressReleaseView />
      </div>
    </div>
  );
}
