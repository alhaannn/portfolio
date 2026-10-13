import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/design-system";
import { motion } from "framer-motion";

export interface TextRevealFaqItem {
  id: string;
  question: string;
  answer: string;
}

interface TextRevealFaqsProps {
  items: TextRevealFaqItem[];
  title: string;
  subtitle: string;
  contactLabel: string;
  contactHref: string;
}

export default function TextRevealFaqs({
  items,
  title,
  subtitle,
  contactLabel,
  contactHref,
}: TextRevealFaqsProps) {
  return (
    <div className="mx-auto grid w-full max-w-5xl gap-8 md:grid-cols-5 md:gap-12">
      <div className="md:col-span-2">
        <h2 className="font-serif text-4xl font-semibold tracking-tight text-primary">
          {title}
        </h2>
        <p className="mt-4 text-balance text-lg text-muted-foreground">
          {subtitle}
        </p>
        <p className="mt-6 hidden text-muted-foreground md:block">
          Can’t find what you’re looking for?{" "}
          <a
            href={contactHref}
            className="font-medium text-primary hover:underline"
          >
            {contactLabel}
          </a>
        </p>
      </div>

      <div className="md:col-span-3">
        <Accordion type="single" collapsible>
          {items.map((item) => (
            <AccordionItem
              key={item.id}
              value={item.id}
              className="border-b border-border"
            >
              <AccordionTrigger className="cursor-pointer text-base font-medium hover:no-underline">
                {item.question}
              </AccordionTrigger>
              <AccordionContent>
                <BlurredStagger text={item.answer} />
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>

      <p className="text-muted-foreground md:hidden">
        Can’t find what you’re looking for?{" "}
        <a
          href={contactHref}
          className="font-medium text-primary hover:underline"
        >
          {contactLabel}
        </a>
      </p>
    </div>
  );
}

export const BlurredStagger = ({
  text = "built by ruixen.com",
}: {
  text: string;
}) => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.015,
      },
    },
  };

  const letterAnimation = {
    hidden: {
      opacity: 0,
      filter: "blur(10px)",
    },
    show: {
      opacity: 1,
      filter: "blur(0px)",
    },
  };

  return (
    <div className="w-full">
      <motion.p
        variants={container}
        initial="hidden"
        animate="show"
        className="text-base leading-relaxed break-words whitespace-normal text-muted-foreground"
      >
        {text.split("").map((char, index) => (
          <motion.span
            key={index}
            variants={letterAnimation}
            transition={{ duration: 0.3 }}
            className="inline-block"
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </motion.p>
    </div>
  );
};
