// pages/TermsOfService.tsx

import React from "react";
import MainLayout from "@/layouts/MainLayout";

export const metadata = {
  title: "Bondscape | Terms of Service",
};

export default function Terms() {
  return (
    <MainLayout backgroundImage={false}>
      <div className="w-full min-h-mobile md:min-h-md lg:min-h-lg xl:min-h-xl">
        <div className="flex flex-col text-bondscape-text_neutral_500 px-xMobile md:px-xMd lg:px-xLg xl:px-xXl py-yMobile text-[16px] leading-loose">
          <h1 className="text-2xl md:text-4xl font-semibold leading-9 text-bondscape-text_neutral_400 pb-[32px]">
            Terms of Service
          </h1>
          <p className="pb-4">
            The following terms and conditions govern your access to and use of
            the Bondscape application, and any related content, products, and
            services offered by Desmos Labs Limited (collectively, the “
            <strong className="text-bondscape-text_neutral_400">
              Platform
            </strong>
            ”).
            <strong className="text-bondscape-text_neutral_400">
              Please read these terms and conditions carefully before using our
              Platform.
            </strong>
          </p>
          <p className="pb-4">
            The Platform is operated by Desmos Labs Limited, a company
            incorporated in Hong Kong with company registration number 3210522,
            having its registered office at Flat 3B, Tontex Industrial Building,
            2-4 Sheung Hei Street, San Po Kong, Kowloon, Hong Kong (“
            <strong className="text-bondscape-text_neutral_400">
              Desmos Labs
            </strong>
            ”, “we” or “us”). Users of our services are referred to as “
            <strong className="text-bondscape-text_neutral_400">users</strong>”
            or “you”.
          </p>
          <p>
            By using our Platform, you agree to be legally bound by these terms
            and conditions, as they may be modified or supplemented from time to
            time (these “
            <strong className="text-bondscape-text_neutral_400">Terms</strong>
            ”). If you are accessing or using our Platform as a representative
            of an organization, you are agreeing to these Terms on their behalf.
            Desmos Labs and users are referred to as “parties” in these Terms.
          </p>

          {/* Our Platform */}
          <h2
            id="platform"
            className="text-sm md:text-xl font-semibold leading-9 text-bondscape-text_neutral_400 py-[32px]"
          >
            Our Platform
          </h2>
          <p>
            Bondscape is an application that seamlessly integrates the Desmos
            Blockchain to provide users with decentralized profiles, connections
            (relationships between users), and assets (NFTs, tokens) granting
            them total and complete ownership over them.
          </p>
          <p>
            Bondscape does not collect your personal data (such as your email
            address or your mobile phone number) when you create your Bondscape
            profile or when you use or interact with Bondscape. You are
            completely free to submit any information about yourself. Please
            refer to our Privacy Policy for details on how we handle any
            personal data we receive from you.
          </p>
          {/* Add the rest of the content similarly */}

          {/* Changes to the Terms */}
          <h1
            id="changes"
            className="text-sm md:text-xl font-semibold leading-9 text-bondscape-text_neutral_400 py-[32px]"
          >
            Changes to the Terms
          </h1>
          <p>
            We may revise these Terms from time to time in our sole discretion.
            All changes are effective immediately when we post them, and apply
            to all access to and use of our Platform thereafter. Your continued
            use of our Platform following the posting of revised Terms means
            that you accept and agree to the changes.
          </p>

          {/* Contact Us */}
          <h1
            id="contacts"
            className="text-sm md:text-xl font-semibold leading-9 text-bondscape-text_neutral_400 py-[32px]"
          >
            Contact Us
          </h1>
          <p>
            If you have any questions or concerns about these Terms or our
            Platform, please contact us at info@desmos.com.
          </p>
        </div>
      </div>
    </MainLayout>
  );
}
