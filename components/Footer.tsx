"use client";

import { footerLinks } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

type FooterColumnType = {
  title: string;
  links: Array<string>;
};

const FooterColumn = ({ title, links }: FooterColumnType) => (
  <div className="footer_column">
    <h4 className="font-semibold">{title}</h4>
    <ul className="flex flex-col gap-2 font-normal">
      {links.map((link) => (
        <Link href="/" key={link}>
          {link}
        </Link>
      ))}
    </ul>
  </div>
);

const Footer = () => {
  const pathname = usePathname();

  return (
    <>
      {pathname === "/" && (
        <footer className="flex-start footer">
          <div className="flex flex-col gap-12 w-full ">
            <div className="flex flex-col items-start">
              <Image
                src="/assets/icons/logo.svg"
                width={150}
                height={40}
                alt="Prompt Wizard"
              />
              <p className="text-start text-sm font-normal mt-5 max-w-sm">
                Prompt Wizard is an open-source AI prompting tool to discover,
                create and share creative prompts.
              </p>
            </div>
            <div className="flex flex-wrap gap-12">
              <FooterColumn
                title={footerLinks[0].title}
                links={footerLinks[0].links}
              />

              <div className="flex-1 flex flex-col gap-4">
                <FooterColumn
                  title={footerLinks[1].title}
                  links={footerLinks[1].links}
                />
                <FooterColumn
                  title={footerLinks[2].title}
                  links={footerLinks[2].links}
                />
              </div>

              <FooterColumn
                title={footerLinks[3].title}
                links={footerLinks[3].links}
              />

              <div className="flex-1 flex flex-col gap-4">
                <FooterColumn
                  title={footerLinks[4].title}
                  links={footerLinks[4].links}
                />
                <FooterColumn
                  title={footerLinks[5].title}
                  links={footerLinks[5].links}
                />
              </div>

              <FooterColumn
                title={footerLinks[6].title}
                links={footerLinks[6].links}
              />
            </div>
          </div>
          <div className="flex-between footer_copyright">
            <p>@ 2023 Prompt Wizard. All rights reserved</p>
          </div>
        </footer>
      )}
    </>
  );
};

export default Footer;
