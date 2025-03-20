import Link from "next/link";
import React from "react";

function RegisterLinks() {
  return (
    <>
      <div className="w-full flex justify-center flex-wrap gap-[10px] ">
        <Link
          href={"https://about.x.com/en"}
          target="_blank"
          className="text-[#656A6E] hover:underline text-[14px]"
        >
          About
        </Link>
        <Link
          href={"https://help.x.com/en/using-x/download-the-x-app"}
          target="_blank"
          className="text-[#656A6E] hover:underline text-[14px]"
        >
          Download the X app
        </Link>
        <Link
          href={"https://help.x.com/en"}
          target="_blank"
          className="text-[#656A6E] hover:underline text-[14px]"
        >
          Help Center
        </Link>
        <Link
          href={"https://x.com/en/tos"}
          target="_blank"
          className="text-[#656A6E] hover:underline text-[14px]"
        >
          Terms of Service
        </Link>
        <Link
          href={"https://x.com/en/privacy"}
          target="_blank"
          className="text-[#656A6E] hover:underline text-[14px]"
        >
          Privacy Policy
        </Link>
        <Link
          href={"https://help.x.com/en/rules-and-policies/x-cookies"}
          target="_blank"
          className="text-[#656A6E] hover:underline text-[14px]"
        >
          Cookie Policy
        </Link>
        <Link
          href={"https://help.x.com/en/resources/accessibility"}
          target="_blank"
          className="text-[#656A6E] hover:underline text-[14px]"
        >
          Accessibility
        </Link>
        <Link
          href={"https://business.x.com/en/help/troubleshooting/how-x-ads-work"}
          target="_blank"
          className="text-[#656A6E] hover:underline text-[14px]"
        >
          Ads info
        </Link>
        <Link
          href={"https://blog.x.com/"}
          target="_blank"
          className="text-[#656A6E] hover:underline text-[14px]"
        >
          Blog
        </Link>
        <Link
          href={"https://careers.x.com/en"}
          target="_blank"
          className="text-[#656A6E] hover:underline text-[14px]"
        >
          Careers
        </Link>
        <Link
          href={"https://about.x.com/en/who-we-are/brand-toolkit"}
          target="_blank"
          className="text-[#656A6E] hover:underline text-[14px]"
        >
          Brand Resources
        </Link>
        <Link
          href={
            "https://business.x.com/en/advertising?ref=gl-tw-tw-twitter-advertise"
          }
          target="_blank"
          className="text-[#656A6E] hover:underline text-[14px]"
        >
          Advertising
        </Link>
        <Link
          href={"https://business.x.com/en"}
          target="_blank"
          className="text-[#656A6E] hover:underline text-[14px]"
        >
          Marketing
        </Link>
        <Link
          href={
            "https://business.x.com/en?ref=web-twc-ao-gbl-twitterforbusiness&utm_source=twc&utm_medium=web&utm_campaign=ao&utm_content=twitterforbusiness"
          }
          target="_blank"
          className="text-[#656A6E] hover:underline text-[14px]"
        >
          X for Business
        </Link>
        <Link
          href={"https://developer.x.com/en"}
          target="_blank"
          className="text-[#656A6E] hover:underline text-[14px]"
        >
          Developers
        </Link>
        <Link
          href={"https://x.com/i/directory/profiles"}
          target="_blank"
          className="text-[#656A6E] hover:underline text-[14px]"
        >
          Directory
        </Link>
        <Link
          href={"https://x.com/settings/account/personalization"}
          target="_blank"
          className="text-[#656A6E] hover:underline text-[14px]"
        >
          Settings
        </Link>
      </div>
    </>
  );
}

export default RegisterLinks;
