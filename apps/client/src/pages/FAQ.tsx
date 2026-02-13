import { ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const faqs = [
        {
            category: 'Orders & Shipping',
            questions: [
                {
                    q: 'How long does shipping take?',
                    a: 'Standard shipping typically takes 5-7 business days. Express shipping is available and takes 2-3 business days. Free shipping is offered on orders over $50.'
                },
                {
                    q: 'Can I track my order?',
                    a: 'Yes! Once your order ships, you\'ll receive a tracking number via email. You can also track your order from the Orders page in your account.'
                },
                {
                    q: 'Do you ship internationally?',
                    a: 'Yes, we ship to over 50 countries worldwide. International shipping times vary by location, typically 10-15 business days.'
                },
                {
                    q: 'What if my order is damaged or lost?',
                    a: 'If your order arrives damaged or gets lost in transit, please contact our support team within 48 hours. We\'ll arrange a replacement or full refund.'
                }
            ]
        },
        {
            category: 'Returns & Refunds',
            questions: [
                {
                    q: 'What is your return policy?',
                    a: 'We offer a 30-day return policy on most items. Products must be unused and in original packaging. Some items like personalized products are non-returnable.'
                },
                {
                    q: 'How do I initiate a return?',
                    a: 'Go to your Orders page, select the order you want to return, and click "Request Return". Follow the instructions to print your return label.'
                },
                {
                    q: 'When will I receive my refund?',
                    a: 'Refunds are processed within 5-7 business days after we receive your return. The amount will be credited to your original payment method.'
                },
                {
                    q: 'Can I exchange an item?',
                    a: 'Yes! You can exchange items for a different size or color. Contact our support team to arrange an exchange.'
                }
            ]
        },
        {
            category: 'Payment & Security',
            questions: [
                {
                    q: 'What payment methods do you accept?',
                    a: 'We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and Apple Pay. All payments are processed securely.'
                },
                {
                    q: 'Is my payment information secure?',
                    a: 'Absolutely! We use industry-standard SSL encryption to protect your payment information. We never store your full credit card details.'
                },
                {
                    q: 'Can I use multiple payment methods?',
                    a: 'Currently, we only support one payment method per order. However, you can use gift cards in combination with other payment methods.'
                },
                {
                    q: 'Do you offer payment plans?',
                    a: 'Yes, we partner with Affirm and Klarna to offer flexible payment plans on orders over $100. Select this option at checkout.'
                }
            ]
        },
        {
            category: 'Account & Privacy',
            questions: [
                {
                    q: 'Do I need an account to shop?',
                    a: 'No, you can checkout as a guest. However, creating an account allows you to track orders, save addresses, and access exclusive deals.'
                },
                {
                    q: 'How do I reset my password?',
                    a: 'Click "Forgot Password" on the login page. Enter your email address and we\'ll send you a link to reset your password.'
                },
                {
                    q: 'How is my data protected?',
                    a: 'We take privacy seriously. Your data is encrypted and stored securely. We never sell your information to third parties. Read our Privacy Policy for details.'
                },
                {
                    q: 'Can I delete my account?',
                    a: 'Yes, you can request account deletion by contacting our support team. Note that this action is permanent and cannot be undone.'
                }
            ]
        }
    ];

    return (
        <div className="animate-fadeIn">
            {/* Hero Section */}
            <section className="bg-gradient-to-r from-primary to-gray-800 dark:from-gray-900 dark:to-black text-white py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-5xl font-bold mb-4">Frequently Asked Questions</h1>
                    <p className="text-xl text-gray-300">Find answers to common questions about our services</p>
                </div>
            </section>

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                {faqs.map((category, categoryIndex) => (
                    <div key={categoryIndex} className="mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">{category.category}</h2>
                        <div className="space-y-4">
                            {category.questions.map((faq, faqIndex) => {
                                const globalIndex = categoryIndex * 100 + faqIndex;
                                const isOpen = openIndex === globalIndex;

                                return (
                                    <div key={faqIndex} className="card">
                                        <button
                                            onClick={() => setOpenIndex(isOpen ? null : globalIndex)}
                                            className="w-full flex items-center justify-between text-left"
                                        >
                                            <h3 className="font-semibold text-lg text-gray-900 dark:text-white pr-4">{faq.q}</h3>
                                            {isOpen ? (
                                                <ChevronUp className="text-accent flex-shrink-0" size={24} />
                                            ) : (
                                                <ChevronDown className="text-gray-400 flex-shrink-0" size={24} />
                                            )}
                                        </button>
                                        {isOpen && (
                                            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                                                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{faq.a}</p>
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ))}

                {/* Still Have Questions */}
                <div className="mt-16 text-center card bg-accent/5 dark:bg-accent/10">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Still have questions?</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                        Can't find the answer you're looking for? Our customer support team is here to help.
                    </p>
                    <a href="/contact" className="btn-primary inline-block">
                        Contact Support
                    </a>
                </div>
            </div>
        </div>
    );
}
