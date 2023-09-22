import React from "react";
import MainLayout from "../layouts/MainLayout";
import DefaultSEO from "../seo";

export const metadata = {
  ...DefaultSEO,
  title: "Privacy Policy | Bondscape",
};

export default function Privacy() {
  return (
    <MainLayout backgroundImage={false}>
      <div className="w-full">
        <div className="flex flex-col text-bondscape-text_neutral_500 px-xMobile md:px-xMd lg:px-xLg xl:px-xXl py-yMobile md:py-yMd lg:py-yLg xl:py-yXl text-[16px] leading-loose">
          {/* Title */}
          <h1 className="text-2xl md:text-4xl font-semibold leading-9 text-bondscape-text_neutral_400 pb-[32px]">
            Privacy Policy
          </h1>
          <p className="pb-[32px]">
            <strong className="text-bondscape-text_neutral_400">
              Last updated: 2 Jun 2023
            </strong>
          </p>
          <p>
            This policy describes the privacy practices of Bondscape and related
            content, features, and functionality (collectively, the “Platform“)
            and the various services that we offer to you on or through the
            Platform (the Services). Users of our Services are referred to as
            “users“ or “you“.
          </p>
          <p>
            <strong className="text-bondscape-text_neutral_400">
              Please read this policy and the Bondscape Terms of Service
              carefully before engaging with the Platform or using the Services.
            </strong>
          </p>
          <p>
            <strong className="text-bondscape-text_neutral_400">
              If you are uncomfortable with the immutable, permanent, and
              transparent nature of entries on a blockchain, you should not
              engage with the Platform or use the Services.
            </strong>
          </p>
          <p>
            By engaging with our Platform and using our Services, you accept the
            privacy practices as set out in this policy, as may be modified or
            supplemented from time to time. If you are engaging with our
            Platform or using our Services as a representative of an
            organization, you are accepting these practices on their behalf.
          </p>
          <p>
            If you have any questions about this policy or any privacy issues
            related to your use of our Services, please contact us by email to{" "}
            <strong className="text-bondscape-text_neutral_400">
              privacy@desmos.network
            </strong>
            .
          </p>

          {/* About Us */}
          <h2
            className="text-sm md:text-xl font-semibold leading-9 text-bondscape-text_neutral_400 py-[32px]"
            id="about"
          >
            About us
          </h2>
          <p>
            BondScape is a mobile application designed for event management and
            connection building, seamlessly integrating with the
            <a href="https://desmos.network/">Desmos Blockchain</a>. Our
            platform empowers users to create decentralized and portable
            profiles, giving them complete ownership and control over their
            Memories and Bonds. While our long-term vision includes
            decentralization, for the initial MVP phase, these features are
            centralized to ensure a faster-development pace and test out the
            features with beta testers. With BondScape, users can create
            meaningful Memories and forge strong Bonds, all within a secure and
            user-centric environment.
          </p>
          <p>
            Desmos Labs Limited is a company incorporated in Hong Kong with
            company registration number 3210522, having its registered office at
            Flat 3B, Tontex Industrial Building, 2-4 Sheung Hei Street, San Po
            Kong, Kowloon, Hong Kong.
          </p>

          {/* Data Collection and Data Retention */}
          <h2
            className="text-sm md:text-xl font-semibold leading-9 text-bondscape-text_neutral_400 py-[32px]"
            id="data-collection-and-retention"
          >
            Data Collection and Data Retention
          </h2>
          <p>
            For the purpose of this policy, “
            <strong className="text-bondscape-text_neutral_400">
              personal data
            </strong>
            “ refers to any information which is related to an identified or
            identifiable natural person. “Personal data“ and “personal
            information“ are used interchangeably.
          </p>
          {/* Add the rest of the content similarly */}

          {/* Changes to This Privacy Policy */}
          <h2
            className="text-sm md:text-xl font-semibold leading-9 text-bondscape-text_neutral_400 py-[32px]"
            id="changes"
          >
            Changes to This Privacy Policy
          </h2>
          <p>
            We may update our Privacy Policy from time to time. We will notify
            you of any changes by posting the new Privacy Policy on this page.
          </p>
          <p>
            You are advised to review this Privacy Policy periodically for any
            changes. Changes to this Privacy Policy are effective when they are
            posted on this page.
          </p>

          {/* Contact Us */}
          <h2
            className="text-sm md:text-xl font-semibold leading-9 text-bondscape-text_neutral_400 py-[32px]"
            id="contacts"
          >
            Contact Us
          </h2>
          <p>
            If you have any questions or suggestions about our Privacy Policy,
            do not hesitate to contact us at privacy@desmos.network.
          </p>
        </div>
      </div>
    </MainLayout>
  );
}
