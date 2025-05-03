import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function FaqSection() {
  const faqItems = [
    {
      question: "How do subscriptions work?",
      answer: "Our subscription plans are billed either monthly or annually based on your preference. Once subscribed, you'll get immediate access to content based on your chosen plan. You can manage, upgrade, or cancel your subscription anytime through your account dashboard."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards (Visa, Mastercard, American Express), PayPal, and various regional payment methods. All payments are processed securely through our payment partners."
    },
    {
      question: "Can I cancel my subscription anytime?",
      answer: "Yes, you can cancel your subscription at any time through your account dashboard. Your subscription will remain active until the end of your current billing period. No refunds are provided for partial subscription periods."
    },
    {
      question: "How do I access the content?",
      answer: "After subscribing, you can access all content through your personalized dashboard. Content can be viewed online and, depending on the type, may be available for download. Our platform is accessible on desktop and mobile devices."
    },
    {
      question: "Is there a free trial available?",
      answer: "Yes, we offer a 7-day free trial for new users. You can try out our platform and access limited content before committing to a subscription. Credit card information is required for the trial, but you won't be charged until the trial period ends."
    }
  ];

  return (
    <section id="faq" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Find answers to common questions about our subscription service.
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-6">
            {faqItems.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="bg-white rounded-lg shadow-sm">
                <AccordionTrigger className="px-5 py-4 text-lg font-medium text-left hover:no-underline">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="px-5 pb-5 text-gray-600">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
