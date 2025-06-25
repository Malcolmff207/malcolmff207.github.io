import React from 'react';
import ContactForm from '../components/ContactForm';
import ContactInfo from '../components/ContactInfo';
import CallToAction from '../components/CallToAction';
import SocialLinks from '../components/SocialLinks';
import FAQAccordion from '../components/FAQAccordian';

const ContactPage = () => {
    return (
        <section className="pt-20 bg-slate-100 dark:bg-gray-900 transition-colors duration-300" id="contact">
            <div className="lg:ml-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Header Section */}
                <div className="text-center mb-16">
                    <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-gray-100 mb-6 transition-colors duration-300">
                        Let's Connect
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed transition-colors duration-300">
                        I'm actively seeking opportunities to start my career in software development. 
                        If you have an exciting role or want to learn more about my skills and passion for coding, I'd love to hear from you!
                    </p>
                </div>

                {/* Main Contact Grid */}
                <div className="grid lg:grid-cols-3 gap-8 mb-16">
                    <ContactForm />
                    <ContactInfo />
                </div>
            </div>
        <SocialLinks />
        <FAQAccordion />
        <CallToAction />
        </section>
    );
};

export default ContactPage;