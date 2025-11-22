import SideBarCard from '../molecules/sidebar-card';
import { fetchArticles } from '../../services';
import SocialShareButton from '../molecules/social-share-button';

export default async function SideBar() {
  // Fetch articles (10 for latest + random selection)
  const articles = await fetchArticles(10);

  // Get 3 latest articles for "Latest Releases" (already sorted by newest first)
  const latestArticles = articles.slice(0, 3);

  // Get 3 random articles for "Suggested Articles"
  const shuffled = [...articles].sort(() => Math.random() - 0.5);
  const suggestedArticles = shuffled.slice(0, 3);

  const socialLinks = [
    { icon: '', alt: 'copy icon', platform: 'instagram' as const },
    { icon: '/icons/fb-icon.png', alt: 'facebook icon', platform: 'facebook' as const },
    { icon: '/icons/twitter-icon.png', alt: 'twitter icon', platform: 'twitter' as const },
    { icon: '/icons/linkedln-icon.png', alt: 'linkedin icon', platform: 'linkedin' as const },
  ];

  return (
    <div className="md:flex-2/6 lg:block hidden">
      <aside className="justify-start max-w-96 flex flex-col gap-6">
        <section className="py-4 px-6 rounded-lg bg-white drop-shadow-xl flex flex-col gap-2">
          <h3 className="font-onest font-bold text-base">Share This Story</h3>
          <div className="flex gap-4">
            {socialLinks.map((social) => (
              <SocialShareButton
                key={social.platform}
                icon={social.icon}
                alt={social.alt}
                platform={social.platform}
              />
            ))}
          </div>
        </section>
        <section className="bg-white drop-shadow-xl rounded-lg p-4 flex flex-col gap-4">
          <h3 className="font-onest text-base font-bold ">Suggested Articles</h3>
          {suggestedArticles.map((article) => (
            <SideBarCard
              key={article.id}
              title={article.title}
              date={new Date(article.createdAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
              imgLink={
                typeof article.featuredImage === 'object' && article.featuredImage?.url
                  ? article.featuredImage.url
                  : '/misc/placeholder.png'
              }
              slug={article.slug}
            />
          ))}
        </section>
        <section className="bg-white drop-shadow-xl rounded-lg p-4 flex flex-col gap-4">
          <h3 className="font-onest text-base font-bold ">Latest Releases</h3>
          {latestArticles.map((article) => (
            <SideBarCard
              key={article.id}
              title={article.title}
              date={new Date(article.createdAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
              imgLink={
                typeof article.featuredImage === 'object' && article.featuredImage?.url
                  ? article.featuredImage.url
                  : '/misc/placeholder.png'
              }
              slug={article.slug}
            />
          ))}
        </section>
      </aside>
    </div>
  );
}
