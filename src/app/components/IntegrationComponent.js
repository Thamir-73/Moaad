import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useAnimation } from 'framer-motion';
import { FaIndustry, FaStore, FaRecycle } from 'react-icons/fa';
import { useLanguage } from '@/app/LanguageContext';
import { useInView } from 'react-intersection-observer';
import Link from 'next/link';

const TextRevealByWord = ({ text, className, isRTL }) => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start 0.7", "start 0.2"]
  });

  const words = text.split(" ");

  return (
    <div ref={targetRef} className={`relative z-0 h-[30vh] ${className}`}>
      <div className="sticky top-1/3 mx-auto flex h-full max-w-4xl items-center bg-transparent px-4">
        <p className="flex flex-wrap text-2xl font-bold text-black/20 dark:text-white/20 md:text-3xl lg:text-4xl xl:text-5xl" style={{ direction: isRTL ? 'rtl' : 'ltr' }}>
          {words.map((word, i) => {
            const start = i / words.length;
            const end = start + 1 / words.length;
            return (
              <Word key={i} progress={scrollYProgress} range={[start, end]}>
                {word}
              </Word>
            );
          })}
        </p>
      </div>
    </div>
  );
};

const Word = ({ children, progress, range }) => {
  const opacity = useTransform(progress, range, [0, 1]);
  return (
    <span className="relative mx-1 lg:mx-2.5">
      <span className="absolute opacity-30">{children}</span>
      <motion.span style={{ opacity: opacity }} className="text-black dark:text-white">
        {children}
      </motion.span>
    </span>
  );
};

const FadeInSection = ({ children }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  return (
    <motion.div
      ref={ref}
      animate={controls}
      initial="hidden"
      transition={{ duration: 0.8, ease: 'easeOut' }}
      variants={{
        visible: { opacity: 1, y: 0 },
        hidden: { opacity: 0, y: 20 }
      }}
    >
      {children}
    </motion.div>
  );
};

const IntegrationComponent = () => {
  const { language } = useLanguage();
  const isArabic = language === 'ar';

  const text = {
    en: {
      title: "What is Muaad?",
      explanation: "Muaad is an innovative platform connecting businesses and factories to facilitate recycling waste. We make it easy for companies to manage & profit from their recyclable waste, and for factories to access recyclable materials they need.",
      factories: "Factories",
      factoriesDesc: "Access recyclable materials from various businesses.",
      businesses: "Businesses",
      businessesDesc: "Easily manage and recycle your waste sustainably.",
      app: "Our Platform",
      appDesc: "Connecting businesses and factories for efficient recycling.",
      factoryButton: "I'm a Factory",
      businessButton: "I'm a Business",
      learnMore: "Learn More",
      muaad: "Muaad",
    },
    ar: {
      title: "ما هي مُعاد؟",
      explanation: "مُعاد هي منصة مبتكرة تربط بين الشركات والمصانع لتبسيط عملية إعادة تدوير النفايات. نسهل على الشركات الإدارة والاستفادة من نفاياتها القابلة لإعادة التدوير، وعلى المصانع الوصول إلى المواد القابلة لإعادة التدوير.",
      factories: "المصانع",
      factoriesDesc: "الوصول إلى المواد القابلة لإعادة التدوير من مختلف الشركات.",
      businesses: "الشركات",
      businessesDesc: "إدارة وإعادة تدوير النفايات بسهولة وبشكل مستدام.",
      app: "منصتنا",
      appDesc: ".ربط الشركات والمصانع لإعادة تدوير فعالة ومربحة للجميع",
      factoryButton: "أنا مصنع",
      businessButton: "أنا شركة",
      learnMore: "إعرف المزيد",
      muaad: "مُعاد",
    },
  }[language];

  return (
   <div className={`bg-gradient-to-t from-gray-50 via-[#E6F4FC] to-[#ffffff] py-16 px-4 ${isArabic ? 'rtl' : 'ltr'}`}>
    <div className="max-w-6xl mx-auto">
      <FadeInSection>
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-0 text-gray-800">{text.title}</h2>
      </FadeInSection>
        
        <FadeInSection>
          <div className="flex flex-col items-center justify-center mb-0">
            <div className="relative w-full h-60 md:h-76 flex justify-center items-center">
              {/* Central node */}
              <motion.div 
                className="absolute top-1/3 bg-white rounded-full p-4 shadow-lg z-20"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <FaRecycle className="text-4xl text-green-500" />
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 text-sm font-bold whitespace-nowrap">
                  {text.muaad}
                </div>
              </motion.div>

              {/* Factory node */}
              <div className="absolute left-0 md:left-1/4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-4 shadow-lg z-10">
                <FaIndustry className="text-4xl text-blue-500" />
              </div>

              {/* Business node */}
              <div className="absolute right-0 md:right-1/4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-4 shadow-lg z-10">
                <FaStore className="text-4xl text-purple-500" />
              </div>

              {/* Glowing lines */}
              <motion.div 
                className="absolute left-12 md:left-1/4 top-1/2 w-[calc(50%-3rem)] md:w-1/4 h-0.5 bg-gradient-to-r from-blue-500 to-green-500 z-0"
                initial={{ width: 0 }}
                animate={{ width: 'calc(50% - 3rem)' }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <motion.div 
                className="absolute right-12 md:right-1/4 top-1/2 w-[calc(50%-3rem)] md:w-1/4 h-0.5 bg-gradient-to-l from-purple-500 to-green-500 z-0"
                initial={{ width: 0 }}
                animate={{ width: 'calc(50% - 3rem)' }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>
          </div>
        </FadeInSection>

        <FadeInSection>
          <TextRevealByWord text={text.explanation} isRTL={isArabic} className="mb-20" />
        </FadeInSection>

        <FadeInSection>
          <div className="mt-0 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
           <div className="flex items-center justify-center mb-2">
              <h3 className="text-xl font-semibold">{text.factories}</h3> <FaIndustry className="text-2xl ml-2 text-blue-500"/></div>
              <p className="mb-4">{text.factoriesDesc}</p>
              <Link href="https://form.jotform.com/242763632347460" target="_blank" rel="noopener noreferrer">
              <button className="bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 transition duration-300">
                {text.factoryButton}
              </button></Link>
              <hr className="mt-4 border-t border-blue-400" />
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
              <h3 className="text-xl font-semibold">{text.app}</h3><FaRecycle className="text-2xl ml-2 text-green-500"/></div>
              <p className="mb-4">{text.appDesc}</p>
              <Link href="/#">
              <button className="bg-green-500 text-white px-6 py-2 rounded-full hover:bg-green-600 transition duration-300">
                {text.learnMore}
              </button></Link>
              <hr className="mt-9 border-t border-green-500" />
            </div>
            <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <h3 className="text-xl font-semibold">{text.businesses}</h3><FaStore className="text-2xl ml-2 text-purple-500"/></div>
              <p className="mb-4">{text.businessesDesc}</p>
              <Link href="https://form.jotform.com/242764816214458" target="_blank" rel="noopener noreferrer">
              <button className="bg-purple-500 text-white px-6 py-2 rounded-full hover:bg-purple-600 transition duration-300">
                {text.businessButton}
              </button></Link>
              <hr className="mt-9 border-t border-purple-500" />
            </div>
          </div>
        </FadeInSection>
      </div>
    </div> 
    
  );
};

export default IntegrationComponent;