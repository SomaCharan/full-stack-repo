import React, { Suspense } from 'react';
import Preloader from '../sharedComponents/Preloader';

const Footer = React.lazy(() => import('../sharedComponents/Footer'));
const Navbar = React.lazy(() => import('../sharedComponents/Navbar'));

export default function PrivacyPolicy() {
    return (
        <Suspense fallback={Preloader}>
            <>
                <Navbar />
                <div style={{ height: '20vh' }} />
                <div className="container ">
                    <h2 className="text-center">Privacy Policy</h2>
                    <p>At Successthinks.com, accessible from Https://www.successthinks.com/, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by Successthinks.com and how we use it.
                        <br /> If you have additional questions or require more information about our Privacy Policy, do not hesitate to contact us.
                    </p>
                    <h3 >Consent</h3>
                    <p>
                        By using our website, you hereby consent to our Privacy Policy and agree to its terms.
                    </p>
                    <h3 >Information we collect</h3>
                    <p>
                        The personal information that you are asked to provide, and the reasons why you are asked to provide it, will be made clear to you at the point we ask you to provide your personal information.
                        If you contact us directly, we may receive additional information about you such as your name, email address, phone number, the contents of the message and/or attachments you may send us, and any other information you may choose to provide.
                        When you register for an Account, we may ask for your contact information, including items such as name, company name, address, email address, and telephone number.
                    </p>
                    <h3 >How we use your information</h3>
                    <p>
                        We use the information we collect in various ways, including to:
                        <ul>
                            <li>
                                Provide, operate, and maintain our website
                            </li>
                            <li>
                                Improve, personalize, and expand our website
                            </li>
                            <li>
                                Understand and analyze how you use our website
                            </li>
                            <li>
                                Develop new products, services, features, and functionality
                            </li>
                            <li>
                                Communicate with you, either directly or through one of our partners, including for customer service, to provide you with updates and other information relating to the website, and for marketing and promotional purposes
                            </li>
                            <li>
                                Send you emails
                            </li>
                            <li>
                                Find and prevent fraud
                            </li>
                        </ul>
                    </p>
                    <h3 >Log Files</h3>
                    <p>
                        Successthinks.com follows a standard procedure of using log files. These files log visitors when they visit websites. All hosting companies do this and a part of hosting services&apos; analytics. The information collected by log files include internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks. These are not linked to any information that is personally identifiable. The purpose of the information is for analyzing trends, administering the site, tracking users&apos; movement on the website, and gathering demographic information.
                    </p>
                    <h3 >Cookies and Web Beacons</h3>
                    <p>
                        Like any other website, Successthinks.com uses &apos;cookies&apos;. These cookies are used to store information including visitors&apos; preferences, and the pages on the website that the visitor accessed or visited. The information is used to optimize the users&apos; experience by customizing our web page content based on visitors&apos; browser type and/or other information.
                    </p>
                    <h3 >Third Party Privacy Policies</h3>
                    <p>
                        Successthinks.com&apos;s Privacy Policy does not apply to other advertisers or websites. Thus, we are advising you to consult the respective Privacy Policies of these third-party ad servers for more detailed information. It may include their practices and instructions about how to opt-out of certain options.
                        You can choose to disable cookies through your individual browser options. To know more detailed information about cookie management with specific web browsers, it can be found at the browsers&apos; respective websites. </p>
                    <h3 >GDPR Data Protection Rights</h3>
                    <p>
                        We would like to make sure you are fully aware of all of your data protection rights. Every user is entitled to the following:
                        <br />
                        The right to access – You have the right to request copies of your personal data. We may charge you a small fee for this service.
                        <br />
                        The right to rectification – You have the right to request that we correct any information you believe is inaccurate. You also have the right to request that we complete the information you believe is incomplete.
                        <br />
                        The right to erasure – You have the right to request that we erase your personal data, under certain conditions.
                        <br />
                        The right to restrict processing – You have the right to request that we restrict the processing of your personal data, under certain conditions.
                        <br />
                        The right to object to processing – You have the right to object to our processing of your personal data, under certain conditions.
                        <br />
                        The right to data portability – You have the right to request that we transfer the data that we have collected to another organization, or directly to you, under certain conditions.
                        <br />
                        If you make a request, we have one month to respond to you. If you would like to exercise any of these rights, please contact us.  </p>
                    <br />
                </div>
                <Footer />
            </>
        </Suspense>
    )
}

