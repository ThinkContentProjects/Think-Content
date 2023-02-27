import { FC } from 'react';

interface Link {
  title: string;
  url: string;
}

interface LinkMapProps {
  title: string;
  links: Link[];
}

const LinkMap: FC<LinkMapProps> = ({ title, links }) => {
  return (
    <div>
      <h4 className="text-lg font-semibold">{title}</h4>
      <ul className="mt-2 space-y-2">
        {links.map((link) => (
          <li key={link.url}>
            <a href={link.url} target="_blank" rel="noopener noreferrer">
              {link.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

const Footer: FC = () => {
  const linkMaps: LinkMapProps[] = [
    {
      title: "About Us",
      links: [
        { title: "Our Story", url: "/our-story" },
        { title: "Meet the Team", url: "/meet-the-team" },
        { title: "Careers", url: "/careers" },
      ],
    },
    {
      title: "Resources",
      links: [
        { title: "Blog", url: "/blog" },
        { title: "FAQs", url: "/faqs" },
        { title: "Documentation", url: "/documentation" },
      ],
    },
    {
      title: "Connect",
      links: [
        { title: "Twitter", url: "https://twitter.com/thinkcontentxyz" },
        { title: "LinkedIn", url: "https://www.linkedin.com/company/thinkcontentxyz" },
        { title: "GitHub", url: "https://github.com/thinkcontentxyz" },
      ],
    },
  ];

  return (
    <footer className="sticky bottom-0 z-20 w-screen px-8 py-12 -m-4 text-white bg-gray-900">
      <div className="container flex flex-col items-center justify-between pb-16 md:flex-row">
        <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-12">
          {linkMaps.map((linkMap) => (
            <LinkMap key={linkMap.title} {...linkMap} />
          ))}
          <div>
            <h4 className="text-lg font-semibold">Contact Us</h4>
            <p className="mt-2 text-sm">
              1234 Main St., Suite 101, Anytown, USA 12345
            </p>
            <p className="mt-1 text-sm">think.content.calendar@gmail.com</p>
            <p className="mt-1 text-sm">(123) 456-7890</p>
          </div>
        </div>
        <div className="flex items-center mt-4 md:mt-0">
          <p className="text-sm">© 2023 thinkcontent.xyz. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
