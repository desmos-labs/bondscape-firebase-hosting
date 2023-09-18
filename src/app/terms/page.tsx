// pages/TermsOfService.tsx

import React from "react";
import Head from "next/head";

const Terms: React.FC = () => {
  return (
    <>
      <Head>
        <title>Terms of Service | Bondscape</title>
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/assets/favicon/favicon-16x16.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/assets/favicon/favicon-32x32.png"
        />
      </Head>
      <body className="legal">
        {/* Title */}
        <h1>Bondscape Terms of Service</h1>
        <p>
          The following terms and conditions govern your access to and use of
          the Bondscape application, and any related content, products, and
          services offered by Desmos Labs Limited (collectively, the “
          <strong>Platform</strong>”).
          <strong>
            Please read these terms and conditions carefully before using our
            Platform.
          </strong>
        </p>
        <p>
          The Platform is operated by Desmos Labs Limited, a company
          incorporated in Hong Kong with company registration number 3210522,
          having its registered office at Flat 3B, Tontex Industrial Building,
          2-4 Sheung Hei Street, San Po Kong, Kowloon, Hong Kong (“
          <strong>Desmos Labs</strong>”, “we” or “us”). Users of our services
          are referred to as “<strong>users</strong>” or “you”.
        </p>
        <p>
          By using our Platform, you agree to be legally bound by these terms
          and conditions, as they may be modified or supplemented from time to
          time (these “<strong>Terms</strong>”). If you are accessing or using
          our Platform as a representative of an organization, you are agreeing
          to these Terms on their behalf. Desmos Labs and users are referred to
          as “parties” in these Terms.
        </p>

        {/* Our Platform */}
        <h2 id="platform">Our Platform</h2>
        <p>
          Bondscape is an application that seamlessly integrates the Desmos
          Blockchain to provide users with decentralized profiles, connections
          (relationships between users), and assets (NFTs, tokens) granting them
          total and complete ownership over them.
        </p>
        <p>
          Bondscape does not collect your personal data (such as your email
          address or your mobile phone number) when you create your Bondscape
          profile or when you use or interact with Bondscape. You are completely
          free to submit any information about yourself. Please refer to our
          Privacy Policy for details on how we handle any personal data we
          receive from you.
        </p>
        {/* Add the rest of the content similarly */}

        {/* Changes to the Terms */}
        <h2 id="changes">Changes to the Terms</h2>
        <p>
          We may revise these Terms from time to time in our sole discretion.
          All changes are effective immediately when we post them, and apply to
          all access to and use of our Platform thereafter. Your continued use
          of our Platform following the posting of revised Terms means that you
          accept and agree to the changes.
        </p>

        {/* Contact Us */}
        <h2 id="contacts">Contact Us</h2>
        <p>
          If you have any questions or concerns about these Terms or our
          Platform, please contact us at info@desmos.com.
        </p>
      </body>
    </>
  );
};

export default Terms;
