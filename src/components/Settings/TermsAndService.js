import React from 'react';
import {View, Linking} from 'react-native';
import {Text} from 'react-native-paper';
import styles from '../../styles/settings.style';
import PageLayout from '../../layout/PageLayout';
import {Paragraph} from 'react-native-paper';

const Descriptions = () => {
  const handleOpenLink = link => {
    let URL = '';
    if (link === 'qongfu') {
      URL = 'https://qongfu.com/';
    } else if (link === 'policyMaker') {
      URL = 'https://policymaker.io/';
    } else if (link === 'termsAndCondition') {
      URL = 'https://policymaker.io/terms-and-conditions';
    }
    Linking.openURL(URL).catch(err => console.error('An error occurred', err));
  };

  return (
    <PageLayout>
      <View style={styles.descriptionContainer}>
        <Text style={styles.descriptionHeading}>1. Introduction</Text>
        <Paragraph style={styles.paragraph}>
          <Text style={styles.descriptionText}>
            Welcome to{' '}
            <Text style={styles.descriptionBoldText}>
              Qongfu Technologies Co SPC
            </Text>{' '}
            (“Company”, “we”, “our”, “us”)!
          </Text>
        </Paragraph>
        <Paragraph style={styles.paragraph}>
          <Text style={styles.descriptionText}>
            These Terms of Service (“Terms”, “Terms of Service”) govern your use
            of our website located at
          </Text>
          <Text
            style={styles.descriptionLinkText}
            onPress={() => handleOpenLink('qongfu')}>
            {' '}
            www.qongfu.com{' '}
          </Text>
          <Text style={styles.descriptionBoldText}>
            and mobile applications{' '}
          </Text>
          <Text style={styles.descriptionText}>
            (together or individually “our services”) operated by{' '}
          </Text>
          <Text style={styles.descriptionBoldText}>
            Qongfu Technologies Co SPC.
          </Text>
        </Paragraph>
        <Paragraph style={styles.paragraph}>
          <Text style={styles.descriptionText}>
            Our Privacy Policy also governs your use of our services and
            explains how we collect, safeguard and disclose information that
            results from your use of our services.
          </Text>
        </Paragraph>
        <Paragraph style={styles.paragraph}>
          <Text style={styles.descriptionText}>
            Your agreement with us includes these Terms and our Privacy Policy
            (“Agreements”). You acknowledge that you have read and understood
            Agreements, and agree to be bound of them.
          </Text>
        </Paragraph>
        <Paragraph style={styles.paragraph}>
          <Text style={styles.descriptionText}>
            If you do not agree with (or cannot comply with) Agreements, then
            you may not use the our services, but please let us know by emailing
            at <Text style={styles.descriptionBoldText}>info@qongfu.com</Text>{' '}
            so we can try to find a solution. These Terms apply to all visitors,
            users and others who wish to access or use our services.
          </Text>
        </Paragraph>
        <Text style={styles.descriptionHeading}>2. Communications</Text>
        <Paragraph style={styles.paragraph}>
          <Text style={styles.descriptionText}>
            By using our services, you agree to subscribe to newsletters,
            marketing or promotional materials and other information we may
            send. However, you may opt out of receiving any, or all, of these
            communications from us by following the unsubscribe link or using
            the setting preferences provided on our website or mobile apps.
          </Text>
        </Paragraph>
        <Text style={styles.descriptionHeading}>3. Purchases</Text>
        <Paragraph style={styles.paragraph}>
          <Text style={styles.descriptionText}>
            If you wish to purchase any product or service made available
            through our services (“Purchase”), you may be asked to supply
            certain information relevant to your Purchase including but not
            limited to, your credit or debit card number, the expiration date of
            your card, your billing address, and your shipping information.
          </Text>
        </Paragraph>
        <Paragraph style={styles.paragraph}>
          <Text style={styles.descriptionText}>
            You represent and warrant that: (i) you have the legal right to use
            any card(s) or other payment method(s) in connection with any
            Purchase; and that (ii) the information you supply to us is true,
            correct and complete.
          </Text>
        </Paragraph>
        <Paragraph style={styles.paragraph}>
          <Text style={styles.descriptionText}>
            We may employ the use of third party services for the purpose of
            facilitating payment and the completion of Purchases. By submitting
            your information, you grant us the right to provide the information
            to these third parties subject to our Privacy Policy.
          </Text>
        </Paragraph>
        <Paragraph style={styles.paragraph}>
          <Text style={styles.descriptionText}>
            We reserve the right to refuse or cancel your order at any time for
            reasons including but not limited to: product or service
            availability, errors in the description or price of the product or
            service, error in your order or other reasons.
          </Text>
        </Paragraph>
        <Paragraph style={styles.paragraph}>
          <Text style={styles.descriptionText}>
            We reserve the right to refuse or cancel your order if fraud or an
            unauthorized or illegal transaction is suspected.
          </Text>
        </Paragraph>
        <Text style={styles.descriptionHeading}>
          4. Contests, Sweepstakes and Promotions
        </Text>
        <Paragraph style={styles.paragraph}>
          <Text style={styles.descriptionText}>
            Any contests, sweepstakes or other promotions (collectively,
            “Promotions”) made available through our services may be governed by
            rules that are separate from these Terms of Service. If you
            participate in any Promotions, please review the applicable rules as
            well as our Privacy Policy. If the rules for a Promotion conflict
            with these Terms of Service, Promotion rules will apply.
          </Text>
        </Paragraph>
        <Text style={styles.descriptionHeading}>5. Subscriptions</Text>
        <Paragraph style={styles.paragraph}>
          <Text style={styles.descriptionText}>
            Some parts of our services are billed on a subscription basis{' '}
            <Text style={styles.descriptionBoldText}>("Subscription(s)").</Text>{' '}
            You will be billed in advance on a recurring and periodic basis
            ("Billing Cycle"). Billing cycles will be set depending on the type
            of subscription plan you select when purchasing a Subscription.
          </Text>
        </Paragraph>
        <Paragraph style={styles.paragraph}>
          <Text style={styles.descriptionText}>
            At the end of each Billing Cycle, your Subscription will
            automatically renew under the exact same conditions unless you
            cancel it or Qongfu Technologies Co SPC cancels it. You may cancel
            your Subscription renewal either through your online account
            management page or by contacting support@qongfu.com customer support
            team.
          </Text>
        </Paragraph>
        <Paragraph style={styles.paragraph}>
          <Text style={styles.descriptionText}>
            A valid payment method is required to process the payment for your
            subscription. You shall provide Qongfu Technologies Co SPC with
            accurate and complete billing information that may include but not
            limited to full name, address, state, postal or zip code, telephone
            number, and a valid payment method information. By submitting such
            payment information, you automatically authorize Qongfu Technologies
            Co SPC to charge all Subscription fees incurred through your account
            to any such payment instruments.
          </Text>
        </Paragraph>
        <Paragraph style={styles.paragraph}>
          <Text style={styles.descriptionText}>
            Should automatic billing fail to occur for any reason, Qongfu
            Technologies Co SPC reserves the right to terminate your access to
            the our services with immediate effect.
          </Text>
        </Paragraph>
        <Text style={styles.descriptionHeading}>6. Free Trial</Text>
        <Paragraph style={styles.paragraph}>
          <Text style={styles.descriptionText}>
            Qongfu Technologies Co SPC may, at its sole discretion, offer a
            Subscription with a free trial for a limited period of time ("Free
            Trial").
          </Text>
        </Paragraph>
        <Paragraph style={styles.paragraph}>
          <Text style={styles.descriptionText}>
            You may be required to enter your billing information in order to
            sign up for Free Trial.
          </Text>
        </Paragraph>
        <Paragraph style={styles.paragraph}>
          <Text style={styles.descriptionText}>
            If you do enter your billing information when signing up for Free
            Trial, you will not be charged by Qongfu Technologies Co SPC until
            Free Trial has expired. On the last day of Free Trial period, unless
            you cancelled your Subscription, you will be automatically charged
            the applicable Subscription fees for the type of Subscription you
            have selected.
          </Text>
        </Paragraph>
        <Paragraph style={styles.paragraph}>
          <Text style={styles.descriptionText}>
            At any time and without notice, Qongfu Technologies Co SPC reserves
            the right to (i) modify Terms of Service of Free Trial offer, or
            (ii) cancel such Free Trial offer.
          </Text>
        </Paragraph>
        <Text style={styles.descriptionHeading}>7. Fee Changes</Text>
        <Paragraph style={styles.paragraph}>
          <Text style={styles.descriptionText}>
            Qongfu Technologies Co SPC, in its sole discretion and at any time,
            may modify Subscription fees for the Subscriptions. Any Subscription
            fee change will become effective at the end of the then-current
            Billing Cycle.
          </Text>
        </Paragraph>
        <Paragraph style={styles.paragraph}>
          <Text style={styles.descriptionText}>
            Qongfu Technologies Co SPC will provide you with a reasonable prior
            notice of any change in Subscription fees to give you an opportunity
            to terminate your Subscription before such change becomes effective.
          </Text>
        </Paragraph>
        <Paragraph style={styles.paragraph}>
          <Text style={styles.descriptionText}>
            Your continued use of our services after Subscription fee change
            comes into effect constitutes your agreement to pay the modified
            Subscription fee amount.
          </Text>
        </Paragraph>
        <Text style={styles.descriptionHeading}>8. Refunds</Text>
        <Paragraph style={styles.paragraph}>
          <Text style={styles.descriptionText}>
            We issue refunds for Contracts related to our services solely within
            <Text style={styles.descriptionBoldText}> 30 days</Text> of the
            original purchase of the Contract, however, we will not be held
            liable for contracts signed with our third-party merchants after
            payments have been received by the merchants. We, Qongfu
            Technologies Co SPC, will do our level best to secure the interests
            of our Users by providing payment security features that will
            mitigate risks of any losses that users may incur by purchasing
            products and services provided by our merchants on our platform.
          </Text>
        </Paragraph>
        <Text style={styles.descriptionHeading}>9. Content</Text>
        <Paragraph style={styles.paragraph}>
          <Text style={styles.descriptionText}>
            Our services allow you to post, link, store, share and otherwise
            make available certain information, text, graphics, videos, or other
            material (“Content”). You are responsible for Content that you post
            on or through our services, including its legality, reliability, and
            appropriateness.
          </Text>
        </Paragraph>
        <Paragraph style={styles.paragraph}>
          <Text style={styles.descriptionText}>
            By posting Content on or through our services, You represent and
            warrant that: (i) Content is yours (you own it) and/or you have the
            right to use it and the right to grant us the rights and license as
            provided in these Terms, and (ii) that the posting of your Content
            on or through our services does not violate the privacy rights,
            publicity rights, copyrights, contract rights or any other rights of
            any person or entity. We reserve the right to terminate the account
            of anyone found to be infringing on a copyright.
          </Text>
        </Paragraph>
        <Paragraph style={styles.paragraph}>
          <Text style={styles.descriptionText}>
            You retain any and all of your rights to any Content you submit,
            post or display on or through our services and you are responsible
            for protecting those rights. We take no responsibility and assume no
            liability for Content you or any third party posts on or through our
            services. However, by posting Content using our services you grant
            us the right and license to use, modify, publicly perform, publicly
            display, reproduce, and distribute such Content on and through our
            services. You agree that this license includes the right for us to
            make your Content available to other users of our services, who may
            also use your Content subject to these Terms.
          </Text>
        </Paragraph>
        <Paragraph style={styles.paragraph}>
          <Text style={styles.descriptionText}>
            Qongfu Technologies Co SPC has the right but not the obligation to
            monitor and edit all Content provided by users.
          </Text>
        </Paragraph>
        <Paragraph style={styles.paragraph}>
          <Text style={styles.descriptionText}>
            In addition, Content found on or through this our services are the
            property of Qongfu Technologies Co SPC or used with permission. You
            may not distribute, modify, transmit, reuse, download, repost, copy,
            or use said Content, whether in whole or in part, for commercial
            purposes or for personal gain, without express advance written
            permission from us.
          </Text>
        </Paragraph>
        <Text style={styles.descriptionHeading}>10. Prohibited Uses</Text>
        <Paragraph style={styles.paragraph}>
          <Text style={styles.descriptionText}>
            You may use our services only for lawful purposes and in accordance
            with Terms. You agree not to use our services:
          </Text>
        </Paragraph>
        <Paragraph style={styles.paragraph}>
          <Text style={styles.descriptionText}>
            0.1. In any way that violates any applicable national or
            international law or regulation.
          </Text>
        </Paragraph>
        <Paragraph style={styles.paragraph}>
          <Text style={styles.descriptionText}>
            0.2. For the purpose of exploiting, harming, or attempting to
            exploit or harm minors in any way by exposing them to inappropriate
            content or otherwise.
          </Text>
        </Paragraph>
        <Paragraph style={styles.paragraph}>
          <Text style={styles.descriptionText}>
            0.3. To transmit, or procure the sending of, any advertising or
            promotional material, including any “junk mail”, “chain letter,”
            “spam,” or any other similar solicitation.
          </Text>
        </Paragraph>
        <Paragraph style={styles.paragraph}>
          <Text style={styles.descriptionText}>
            0.4. To impersonate or attempt to impersonate Company, a Company
            employee, another user, or any other person or entity.
          </Text>
        </Paragraph>
        <Paragraph style={styles.paragraph}>
          <Text style={styles.descriptionText}>
            0.5. In any way that infringes upon the rights of others, or in any
            way is illegal, threatening, fraudulent, or harmful, or in
            connection with any unlawful, illegal, fraudulent, or harmful
            purpose or activity.
          </Text>
        </Paragraph>
        <Paragraph style={styles.paragraph}>
          <Text style={styles.descriptionText}>
            0.6. To engage in any other conduct that restricts or inhibits
            anyone’s use or enjoyment of our services, or which, as determined
            by us, may harm or offend Company or users of our services or expose
            them to liability.
          </Text>
        </Paragraph>
        <Paragraph style={styles.paragraph}>
          <Text style={styles.descriptionText}>
            Additionally, you agree not to:
          </Text>
        </Paragraph>
        <Paragraph style={styles.paragraph}>
          <Text style={styles.descriptionText}>
            0.1. Use our services in any manner that could disable, overburden,
            damage, or impair our services or interfere with any other party’s
            use of our services, including their ability to engage in real time
            activities through our services.
          </Text>
        </Paragraph>
        <Paragraph style={styles.paragraph}>
          <Text style={styles.descriptionText}>
            0.2. Use any robot, spider, or other automatic device, process, or
            means to access our services for any purpose, including monitoring
            or copying any of the material on our services.
          </Text>
        </Paragraph>
        <Paragraph style={styles.paragraph}>
          <Text style={styles.descriptionText}>
            0.3. Use any manual process to monitor or copy any of the material
            on our services or for any other unauthorized purpose without our
            prior written consent.
          </Text>
        </Paragraph>
        <Paragraph style={styles.paragraph}>
          <Text style={styles.descriptionText}>
            0.4. Use any device, software, or routine that interferes with the
            proper working of our services.
          </Text>
        </Paragraph>
        <Paragraph style={styles.paragraph}>
          <Text style={styles.descriptionText}>
            0.5. Introduce any viruses, trojan horses, worms, logic bombs, or
            other material which is malicious or technologically harmful.
          </Text>
        </Paragraph>
        <Paragraph style={styles.paragraph}>
          <Text style={styles.descriptionText}>
            0.6. Attempt to gain unauthorized access to, interfere with, damage,
            or disrupt any parts of our services, the server on which our
            services is stored, or any server, computer, or database connected
            to our services.
          </Text>
        </Paragraph>
        <Paragraph style={styles.paragraph}>
          <Text style={styles.descriptionText}>
            0.7. Attack our services via a denial-of-service attack or a
            distributed denial-of-service attack.
          </Text>
        </Paragraph>
        <Paragraph style={styles.paragraph}>
          <Text style={styles.descriptionText}>
            0.8. Take any action that may damage or falsify Company rating.
          </Text>
        </Paragraph>
        <Paragraph style={styles.paragraph}>
          <Text style={styles.descriptionText}>
            0.9. Otherwise attempt to interfere with the proper working of our
            services.
          </Text>
        </Paragraph>
        <Text style={styles.descriptionHeading}>11. Analytics</Text>
        <Paragraph style={styles.paragraph}>
          <Text style={styles.descriptionText}>
            We may use third-party Service Providers to monitor and analyze the
            use of our services.
          </Text>
        </Paragraph>
        <Text style={styles.descriptionHeading}>12. No Use By Minors</Text>
        <Paragraph style={styles.paragraph}>
          <Text style={styles.descriptionText}>
            Our services are intended only for access and use by individuals at
            least sixteen (16) years old. By accessing or using our services,
            you warrant and represent that you are at least sixteen (16) years
            of age and with the full authority, right, and capacity to enter
            into this agreement and abide by all of the terms and conditions of
            Terms. If you are not at least sixteen (16) years old, you are
            prohibited from both the access and usage of our services.
          </Text>
        </Paragraph>
        <Text style={styles.descriptionHeading}>13. Accounts</Text>
        <Paragraph style={styles.paragraph}>
          <Text style={styles.descriptionText}>
            When you create an account with us, you guarantee that you are above
            the age of 16, and that the information you provide us is accurate,
            complete, and current at all times. Inaccurate, incomplete, or
            obsolete information may result in the immediate termination of your
            account on our services.
          </Text>
        </Paragraph>
        <Paragraph style={styles.paragraph}>
          <Text style={styles.descriptionText}>
            You are responsible for maintaining the confidentiality of your
            account and password, including but not limited to the restriction
            of access to your computer, mobile devices and/or account. You agree
            to accept responsibility for any and all activities or actions that
            occur under your account and/or password, whether your password is
            with our services or a third-party service. You must notify us
            immediately upon becoming aware of any breach of security or
            unauthorized use of your account.
          </Text>
        </Paragraph>
        <Paragraph style={styles.paragraph}>
          <Text style={styles.descriptionText}>
            You may not use as a username the name of another person or entity
            or that is not lawfully available for use, a name or trademark that
            is subject to any rights of another person or entity other than you,
            without appropriate authorization. You may not use as a username any
            name that is offensive, vulgar or obscene.
          </Text>
        </Paragraph>
        <Paragraph style={styles.paragraph}>
          <Text style={styles.descriptionText}>
            We reserve the right to refuse service, terminate accounts, remove
            or edit content, or cancel orders in our sole discretion.
          </Text>
        </Paragraph>
        <Text style={styles.descriptionHeading}>14. Intellectual Property</Text>
        <Paragraph style={styles.paragraph}>
          <Text style={styles.descriptionText}>
            Our services and its original content (excluding Content provided by
            users), features and functionality are and will remain the exclusive
            property of Qongfu Technologies Co SPC and its licensors. Our
            services are protected by copyright, trademark, and other laws of
            foreign countries. Our trademarks may not be used in connection with
            any product or service without the prior written consent of Qongfu
            Technologies Co SPC.
          </Text>
        </Paragraph>
        <Text style={styles.descriptionHeading}>15. Copyright Policy</Text>
        <Paragraph style={styles.paragraph}>
          <Text style={styles.descriptionText}>
            We respect the intellectual property rights of others. It is our
            policy to respond to any claim that Content posted on our services
            infringes on the copyright or other intellectual property rights
            (“Infringement”) of any person or entity.
          </Text>
        </Paragraph>

        <Paragraph style={styles.paragraph}>
          <Text style={styles.descriptionText}>
            If you are a copyright owner, or authorized on behalf of one, and
            you believe that the copyrighted work has been copied in a way that
            constitutes copyright infringement, please submit your claim via
            email to legal@qongfu.com, with the subject line: “Copyright
            Infringement” and include in your claim a detailed description of
            the alleged Infringement as detailed below, under “DMCA Notice and
            Procedure for Copyright Infringement Claims”
          </Text>
        </Paragraph>
        <Paragraph style={styles.paragraph}>
          <Text style={styles.descriptionText}>
            You may be held accountable for damages (including costs and
            attorneys’ fees) for misrepresentation or bad-faith claims on the
            infringement of any Content found on and/or through our services on
            your copyright.
          </Text>
        </Paragraph>
        <Text style={styles.descriptionHeading}>
          16. DMCA Notice and Procedure for Copyright Infringement Claims
        </Text>
        <Paragraph style={styles.paragraph}>
          <Text style={styles.descriptionText}>
            You may submit a notification pursuant to the Digital Millennium
            Copyright Act (DMCA) by providing our Copyright Agent with the
            following information in writing (see 17 U.S.C 512(c)(3) for further
            detail):
          </Text>
        </Paragraph>

        <Paragraph style={styles.paragraph}>
          <Text style={styles.descriptionText}>
            0.1. an electronic or physical signature of the person authorized to
            act on behalf of the owner of the copyright’s interest;
          </Text>
        </Paragraph>
        <Paragraph style={styles.paragraph}>
          <Text style={styles.descriptionText}>
            0.2. a description of the copyrighted work that you claim has been
            infringed, including the URL (i.e., web page address) of the
            location where the copyrighted work exists or a copy of the
            copyrighted work;
          </Text>
        </Paragraph>
        <Paragraph style={styles.paragraph}>
          <Text style={styles.descriptionText}>
            0.3. identification of the URL or other specific location on our
            services where the material that you claim is infringing is located;
          </Text>
        </Paragraph>
        <Paragraph style={styles.paragraph}>
          <Text style={styles.descriptionText}>
            0.4. your address, telephone number, and email address;
          </Text>
        </Paragraph>
        <Paragraph style={styles.paragraph}>
          <Text style={styles.descriptionText}>
            0.5. a statement by you that you have a good faith belief that the
            disputed use is not authorized by the copyright owner, its agent, or
            the law;
          </Text>
        </Paragraph>
        <Paragraph style={styles.paragraph}>
          <Text style={styles.descriptionText}>
            0.6. a statement by you, made under penalty of perjury, that the
            above information in your notice is accurate and that you are the
            copyright owner or authorized to act on the copyright owner’s
            behalf.
          </Text>
        </Paragraph>
        <Paragraph style={styles.paragraph}>
          <Text style={styles.descriptionText}>
            You can contact our Copyright Agent via email at legal@qongfu.com.
          </Text>
        </Paragraph>
        <Text style={styles.descriptionHeading}>
          17. Error Reporting and Feedback
        </Text>

        <Paragraph style={styles.paragraph}>
          <Text style={styles.descriptionText}>
            You may provide us either directly at support@qongfu.com or via
            third party sites and tools with information and feedback concerning
            errors, suggestions for improvements, ideas, problems, complaints,
            and other matters related to our services{' '}
            <Text style={styles.descriptionBoldText}>(“Feedback”).</Text> You
            acknowledge and agree that: (i) you shall not retain, acquire or
            assert any intellectual property right or other right, title or
            interest in or to the Feedback; (ii) Company may have development
            ideas similar to the Feedback; (iii) Feedback does not contain
            confidential information or proprietary information from you or any
            third party; and (iv) Company is not under any obligation of
            confidentiality with respect to the Feedback. In the event the
            transfer of the ownership to the Feedback is not possible due to
            applicable mandatory laws, you grant Company and its affiliates an
            exclusive, transferable, irrevocable, free-of-charge,
            sub-licensable, unlimited and perpetual right to use (including
            copy, modify, create derivative works, publish, distribute and
            commercialize) Feedback in any manner and for any purposes.
          </Text>
        </Paragraph>
        <Text style={styles.descriptionHeading}>
          18. Links To Other Web Sites
        </Text>

        <Paragraph style={styles.paragraph}>
          <Text style={styles.descriptionText}>
            Our services may contain links to third party web sites or services
            that are not owned or controlled by Qongfu Technologies Co SPC.
          </Text>
        </Paragraph>
        <Paragraph style={styles.paragraph}>
          <Text style={styles.descriptionText}>
            Qongfu Technologies Co SPC has no control over, and assumes no
            responsibility for the content, privacy policies, or practices of
            any third party web sites or services. We do not warrant the
            offerings of any of these entities/individuals or their websites.
          </Text>
        </Paragraph>
        <Paragraph style={styles.paragraph}>
          <Text style={styles.descriptionText}>
            For example, the outlined Terms of Service have been created using
            <Text
              style={styles.descriptionLinkText}
              onPress={() => handleOpenLink('policyMaker')}>
              {' '}
              PolicyMaker.io
            </Text>
            , a free web application for generating high-quality legal
            documents. PolicyMaker’s{' '}
            <Text
              style={styles.descriptionLinkText}
              onPress={() => handleOpenLink('termsAndCondition')}>
              free Terms and Conditions generator{' '}
            </Text>
            is an easy-to-use free tool for creating an excellent standard Terms
            of Service template for a website, blog, e-commerce store or app.
          </Text>
        </Paragraph>
        <Paragraph style={styles.paragraph}>
          <Text style={styles.descriptionText}>
            YOU ACKNOWLEDGE AND AGREE THAT COMPANY SHALL NOT BE RESPONSIBLE OR
            LIABLE, DIRECTLY OR INDIRECTLY, FOR ANY DAMAGE OR LOSS CAUSED OR
            ALLEGED TO BE CAUSED BY OR IN CONNECTION WITH USE OF OR RELIANCE ON
            ANY SUCH CONTENT, GOODS OR SERVICES AVAILABLE ON OR THROUGH ANY SUCH
            THIRD PARTY WEB SITES OR SERVICES.
          </Text>
        </Paragraph>
        <Paragraph style={styles.paragraph}>
          <Text style={styles.descriptionText}>
            WE STRONGLY ADVISE YOU TO READ THE TERMS OF SERVICE AND PRIVACY
            POLICIES OF ANY THIRD PARTY WEB SITES OR SERVICES THAT YOU VISIT.
          </Text>
        </Paragraph>
        <Text style={styles.descriptionHeading}>
          19. Disclaimer Of Warranty
        </Text>
        <Paragraph style={styles.paragraph}>
          <Text style={styles.descriptionText}>
            THESE SERVICES ARE PROVIDED BY COMPANY ON AN “AS IS” AND “AS
            AVAILABLE” BASIS. COMPANY MAKES NO REPRESENTATIONS OR WARRANTIES OF
            ANY KIND, EXPRESS OR IMPLIED, AS TO THE OPERATION OF THEIR SERVICES,
            OR THE INFORMATION, CONTENT OR MATERIALS INCLUDED THEREIN. YOU
            EXPRESSLY AGREE THAT YOUR USE OF THESE SERVICES, THEIR CONTENT, AND
            ANY SERVICES OR ITEMS OBTAINED FROM US IS AT YOUR SOLE RISK.
          </Text>
        </Paragraph>
        <Paragraph style={styles.paragraph}>
          <Text style={styles.descriptionText}>
            NEITHER COMPANY NOR ANY PERSON ASSOCIATED WITH COMPANY MAKES ANY
            WARRANTY OR REPRESENTATION WITH RESPECT TO THE COMPLETENESS,
            SECURITY, RELIABILITY, QUALITY, ACCURACY, OR AVAILABILITY OF THE
            SERVICES. WITHOUT LIMITING THE FOREGOING, NEITHER COMPANY NOR ANYONE
            ASSOCIATED WITH COMPANY REPRESENTS OR WARRANTS THAT THE SERVICES,
            THEIR CONTENT, OR ANY SERVICES OR ITEMS OBTAINED THROUGH THE
            SERVICES WILL BE ACCURATE, RELIABLE, ERROR-FREE, OR UNINTERRUPTED,
            THAT DEFECTS WILL BE CORRECTED, THAT THE SERVICES OR THE SERVER THAT
            MAKES IT AVAILABLE ARE FREE OF VIRUSES OR OTHER HARMFUL COMPONENTS
            OR THAT THE SERVICES OR ANY SERVICES OR ITEMS OBTAINED THROUGH THE
            SERVICES WILL OTHERWISE MEET YOUR NEEDS OR EXPECTATIONS.
          </Text>
        </Paragraph>
        <Paragraph style={styles.paragraph}>
          <Text style={styles.descriptionText}>
            COMPANY HEREBY DISCLAIMS ALL WARRANTIES OF ANY KIND, WHETHER EXPRESS
            OR IMPLIED, STATUTORY, OR OTHERWISE, INCLUDING BUT NOT LIMITED TO
            ANY WARRANTIES OF MERCHANTABILITY, NON-INFRINGEMENT, AND FITNESS FOR
            PARTICULAR PURPOSE.
          </Text>
        </Paragraph>
        <Paragraph style={styles.paragraph}>
          <Text style={styles.descriptionText}>
            THE FOREGOING DOES NOT AFFECT ANY WARRANTIES WHICH CANNOT BE
            EXCLUDED OR LIMITED UNDER APPLICABLE LAW.
          </Text>
        </Paragraph>
        <Text style={styles.descriptionHeading}>
          20. Limitation Of Liability
        </Text>
        <Paragraph style={styles.paragraph}>
          <Text style={styles.descriptionText}>
            EXCEPT AS PROHIBITED BY LAW, YOU WILL HOLD US AND OUR OFFICERS,
            DIRECTORS, EMPLOYEES, AND AGENTS HARMLESS FOR ANY INDIRECT,
            PUNITIVE, SPECIAL, INCIDENTAL, OR CONSEQUENTIAL DAMAGE, HOWEVER IT
            ARISES (INCLUDING ATTORNEYS’ FEES AND ALL RELATED COSTS AND EXPENSES
            OF LITIGATION AND ARBITRATION, OR AT TRIAL OR ON APPEAL, IF ANY,
            WHETHER OR NOT LITIGATION OR ARBITRATION IS INSTITUTED), WHETHER IN
            AN ACTION OF CONTRACT, NEGLIGENCE, OR OTHER TORTIOUS ACTION, OR
            ARISING OUT OF OR IN CONNECTION WITH THIS AGREEMENT, INCLUDING
            WITHOUT LIMITATION ANY CLAIM FOR PERSONAL INJURY OR PROPERTY DAMAGE,
            ARISING FROM THIS AGREEMENT AND ANY VIOLATION BY YOU OF ANY FEDERAL,
            STATE, OR LOCAL LAWS, STATUTES, RULES, OR REGULATIONS, EVEN IF
            COMPANY HAS BEEN PREVIOUSLY ADVISED OF THE POSSIBILITY OF SUCH
            DAMAGE. EXCEPT AS PROHIBITED BY LAW, IF THERE IS LIABILITY FOUND ON
            THE PART OF COMPANY, IT WILL BE LIMITED TO THE AMOUNT PAID FOR THE
            PRODUCTS AND/OR SERVICES, AND UNDER NO CIRCUMSTANCES WILL THERE BE
            CONSEQUENTIAL OR PUNITIVE DAMAGES. SOME STATES DO NOT ALLOW THE
            EXCLUSION OR LIMITATION OF PUNITIVE, INCIDENTAL OR CONSEQUENTIAL
            DAMAGES, SO THE PRIOR LIMITATION OR EXCLUSION MAY NOT APPLY TO YOU.
          </Text>
        </Paragraph>
        <Text style={styles.descriptionHeading}>21. Termination</Text>
        <Paragraph style={styles.paragraph}>
          <Text style={styles.descriptionText}>
            We may terminate or suspend your account and bar access to our
            services immediately, without prior notice or liability, under our
            sole discretion, for any reason whatsoever and without limitation,
            including but not limited to a breach of Terms.
          </Text>
        </Paragraph>
        <Paragraph style={styles.paragraph}>
          <Text style={styles.descriptionText}>
            If you wish to terminate your account, you may simply discontinue
            using our services.
          </Text>
        </Paragraph>
        <Paragraph style={styles.paragraph}>
          <Text style={styles.descriptionText}>
            All provisions of Terms which by their nature should survive
            termination shall survive termination, including, without
            limitation, ownership provisions, warranty disclaimers, indemnity
            and limitations of liability.
          </Text>
        </Paragraph>
        <Text style={styles.descriptionHeading}>22. Governing Law</Text>
        <Paragraph style={styles.paragraph}>
          <Text style={styles.descriptionText}>
            These Terms shall be governed and construed in accordance with the
            laws of Bahrain, which governing law applies to agreement without
            regard to its conflict of law provisions.
          </Text>
        </Paragraph>
        <Paragraph style={styles.paragraph}>
          <Text style={styles.descriptionText}>
            Our failure to enforce any right or provision of these Terms will
            not be considered a waiver of those rights. If any provision of
            these Terms is held to be invalid or unenforceable by a court, the
            remaining provisions of these Terms will remain in effect. These
            Terms constitute the entire agreement between us regarding our
            services and supersede and replace any prior agreements we might
            have had between us regarding our services.
          </Text>
        </Paragraph>
        <Text style={styles.descriptionHeading}>
          23. Changes To Our Services
        </Text>
        <Paragraph style={styles.paragraph}>
          <Text style={styles.descriptionText}>
            We reserve the right to withdraw or amend our services, and any
            service or material we provide via our services, in our sole
            discretion without notice. We will not be liable if for any reason
            all or any part of our services is unavailable at any time or for
            any period. From time to time, we may restrict access to some parts
            of our services, or our services entirely, to users, including
            registered users.
          </Text>
        </Paragraph>
        <Text style={styles.descriptionHeading}>24. Amendments To Terms</Text>
        <Paragraph style={styles.paragraph}>
          <Text style={styles.descriptionText}>
            We may amend Terms at any time by posting the amended terms on this
            site. It is your responsibility to review these Terms periodically.
          </Text>
        </Paragraph>
        <Paragraph style={styles.paragraph}>
          <Text style={styles.descriptionText}>
            Your continued use of the Platform following the posting of revised
            Terms means that you accept and agree to the changes. You are
            expected to check this page frequently so you are aware of any
            changes, as they are binding on you.
          </Text>
        </Paragraph>
        <Paragraph style={styles.paragraph}>
          <Text style={styles.descriptionText}>
            By continuing to access or use our services after any revisions
            become effective, you agree to be bound by the revised terms. If you
            do not agree to the new terms, you are no longer authorized to use
            our services.
          </Text>
        </Paragraph>
        <Text style={styles.descriptionHeading}>
          25. Waiver And Severability
        </Text>
        <Paragraph style={styles.paragraph}>
          <Text style={styles.descriptionText}>
            No waiver by Company of any term or condition set forth in Terms
            shall be deemed a further or continuing waiver of such term or
            condition or a waiver of any other term or condition, and any
            failure of Company to assert a right or provision under Terms shall
            not constitute a waiver of such right or provision.
          </Text>
        </Paragraph>
        <Paragraph style={styles.paragraph}>
          <Text style={styles.descriptionText}>
            If any provision of Terms is held by a court or other tribunal of
            competent jurisdiction to be invalid, illegal or unenforceable for
            any reason, such provision shall be eliminated or limited to the
            minimum extent such that the remaining provisions of Terms will
            continue in full force and effect.
          </Text>
        </Paragraph>
        <Text style={styles.descriptionHeading}>26. Acknowledgement</Text>
        <Paragraph style={styles.paragraph}>
          <Text style={styles.descriptionText}>
            BY USING OUR SERVICES OR OTHER SERVICES PROVIDED BY US, YOU
            ACKNOWLEDGE THAT YOU HAVE READ THESE TERMS OF SERVICE AND AGREE TO
            BE BOUND BY THEM.
          </Text>
        </Paragraph>
        <Text style={styles.descriptionHeading}>27. Contact Us</Text>
        <Paragraph style={styles.paragraph}>
          <Text style={styles.descriptionText}>
            Please send your feedback, comments, requests for technical support
            by email:{' '}
            <Text style={styles.descriptionBoldText}>support@qongfu.com.</Text>
          </Text>
        </Paragraph>
        <Paragraph style={styles.paragraph}>
          <Text style={styles.descriptionText}>
            These
            <Text
              style={styles.descriptionLinkText}
              onPress={() => handleOpenLink('termsAndCondition')}>
              {' '}
              Terms and Conditions
            </Text>{' '}
            were created for{' '}
            <Text style={styles.descriptionBoldText}>
              {' '}
              www.qongfu.com
            </Text> by{' '}
            <Text
              style={styles.descriptionLinkText}
              onPress={() => handleOpenLink('policyMaker')}>
              PolicyMaker.io{' '}
            </Text>{' '}
            on 2020-05-25.
          </Text>
        </Paragraph>
      </View>
    </PageLayout>
  );
};

export default Descriptions;
