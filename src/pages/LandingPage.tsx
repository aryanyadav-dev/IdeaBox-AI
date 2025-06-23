import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Rocket, 
  Brain, 
  LineChart, 
  Code2, 
  ArrowRight,
  CheckCircle,
  Star,
  Users,
  Sparkles,
  Zap
} from 'lucide-react';
import { FadeIn, SlideUp, SlideInLeft, SlideInRight, StaggerContainer, StaggerItem, HoverScale } from '../components/ui/MotionComponents';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  // Animation variants
  const fadeInUpVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };
  
  // Smooth scroll functionality
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gemini-background text-gemini-text-primary overflow-hidden"
    >
      {/* Background Gradient Orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-[800px] h-[800px] bg-gemini-glow rounded-full blur-[120px] opacity-30 animate-pulse-slow"></div>
        <div className="absolute top-1/3 -left-40 w-[600px] h-[600px] bg-gemini-glow rounded-full blur-[100px] opacity-20 animate-pulse-slow delay-1000"></div>
        <div className="absolute bottom-0 right-0 w-[700px] h-[700px] bg-gemini-glow rounded-full blur-[110px] opacity-25 animate-pulse-slow delay-500"></div>
      </div>

      {/* Navigation */}
      <motion.nav 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 left-0 right-0 z-50 bg-gemini-background/50 backdrop-blur-sm"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <HoverScale>
                <div className="flex-shrink-0">
                  <div className="h-10 w-10 rounded-xl flex items-center justify-center bg-gemini-card/50">
                    <Sparkles className="h-6 w-6 text-gemini-blue" />
                  </div>
                </div>
              </HoverScale>
              <div className="ml-3 text-xl font-semibold bg-gemini-gradient bg-clip-text text-transparent">Ideation AI</div>
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-8">
                  <motion.button 
                    onClick={() => scrollToSection("features")} 
                    className="text-gemini-text-secondary hover:text-gemini-text-primary px-3 py-2 rounded-md text-sm font-medium transition-all duration-300"
                    whileHover={{ scale: 1.05, y: -2 }}
                  >
                    Features
                  </motion.button>
                  <motion.button 
                    onClick={() => scrollToSection("how-it-works")} 
                    className="text-gemini-text-secondary hover:text-gemini-text-primary px-3 py-2 rounded-md text-sm font-medium transition-all duration-300"
                    whileHover={{ scale: 1.05, y: -2 }}
                  >
                    How it Works
                  </motion.button>
                  <motion.button 
                    onClick={() => scrollToSection("pricing")} 
                    className="text-gemini-text-secondary hover:text-gemini-text-primary px-3 py-2 rounded-md text-sm font-medium transition-all duration-300"
                    whileHover={{ scale: 1.05, y: -2 }}
                  >
                    Pricing
                  </motion.button>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <motion.button
                onClick={() => navigate('/dashboard')}
                className="bg-gemini-button-gradient text-gemini-text-primary px-6 py-2.5 rounded-xl text-sm font-medium shadow-glow hover:shadow-glow-hover transition-all duration-500"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                Get Started
              </motion.button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gemini-hero-gradient relative">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            variants={fadeInUpVariant}
            initial="hidden"
            animate="visible"
            className="text-center relative z-10"
          >
            <motion.div
              className="inline-block mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <span className="bg-gemini-glass backdrop-blur-xl px-6 py-2 rounded-xl text-sm font-medium border border-gemini-surface shadow-glass flex items-center gap-2">
                <Zap className="w-4 h-4 text-gemini-yellow" />
                <span className="bg-gemini-gradient bg-clip-text text-transparent">Powered by AI</span>
              </span>
            </motion.div>
            <h1 className="text-5xl md:text-7xl font-bold text-gemini-text-primary mb-6 leading-tight">
              Turn Your Startup Ideas into
              <motion.span 
                className="bg-gemini-gradient bg-clip-text text-transparent ml-2 inline-block"
                initial={{ opacity: 0.6 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
              >
                Reality
              </motion.span>
            </h1>
            <motion.p 
              className="text-xl text-gemini-text-secondary max-w-2xl mx-auto mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Our AI-powered platform helps you validate, plan, and launch your startup in minutes, not months.
            </motion.p>
            <motion.div 
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <motion.button
                onClick={() => navigate('/dashboard')}
                className="w-full sm:w-auto bg-gemini-button-gradient text-gemini-text-primary px-8 py-4 rounded-xl text-lg font-medium shadow-glow hover:shadow-glow-hover transition-all duration-500 backdrop-blur-xl flex items-center justify-center group"
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                Start Building
                <motion.div
                  className="ml-2 group-hover:translate-x-1 transition-transform duration-300"
                >
                  <ArrowRight className="h-5 w-5" />
                </motion.div>
              </motion.button>
              <motion.button 
                onClick={() => scrollToSection("how-it-works")}
                className="w-full sm:w-auto text-gemini-text-primary px-8 py-4 rounded-xl text-lg font-medium border border-gemini-surface bg-gemini-glass backdrop-blur-xl hover:bg-gemini-surface transition-all duration-500 shadow-glass"
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                Learn More
              </motion.button>
            </motion.div>
          </motion.div>
        </div>

        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none mix-blend-soft-light">
          <motion.div 
            className="absolute top-20 left-1/4 w-32 h-32 rounded-2xl bg-gemini-blue/20 backdrop-blur-3xl"
            animate={{ 
              y: [0, -15, 0],
              rotate: [0, 5, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div 
            className="absolute top-40 right-1/4 w-24 h-24 rounded-full bg-gemini-purple/20 backdrop-blur-3xl"
            animate={{ 
              y: [0, 20, 0],
              x: [0, -10, 0],
              scale: [1, 0.9, 1]
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div 
            className="absolute bottom-20 right-1/3 w-28 h-28 rounded-lg bg-gemini-pink/20 backdrop-blur-3xl"
            animate={{ 
              y: [0, -25, 0],
              rotate: [0, -5, 0],
              scale: [1, 1.2, 1]
            }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gemini-background border-t border-gemini-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SlideUp delay={0.1}>
          <div className="text-center mb-16">
              <span className="inline-block bg-gemini-gradient bg-clip-text text-transparent px-3 py-1 rounded-full text-sm font-medium border border-gemini-surface mb-3">
                Features
              </span>
              <h2 className="text-3xl font-bold text-gemini-text-primary mb-4">Powered by Advanced AI</h2>
              <p className="text-xl text-gemini-text-secondary">Everything you need to validate and launch your startup</p>
          </div>
          </SlideUp>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Brain className="h-8 w-8 text-gemini-blue" />,
                color: "bg-gemini-blue",
                title: "Market Research",
                description: "AI-powered market analysis and competitor research"
              },
              {
                icon: <LineChart className="h-8 w-8 text-gemini-purple" />,
                color: "bg-gemini-purple",
                title: "Idea Validation",
                description: "Get data-driven validation for your startup concept"
              },
              {
                icon: <Code2 className="h-8 w-8 text-gemini-pink" />,
                color: "bg-gemini-pink",
                title: "MVP Planning",
                description: "Generate technical roadmap and feature specifications"
              },
              {
                icon: <Users className="h-8 w-8 text-gemini-teal" />,
                color: "bg-gemini-teal",
                title: "Target Audience",
                description: "Identify and analyze your ideal customer segments"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ 
                  y: -5,
                  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
                }}
                className="bg-gemini-card-gradient p-8 rounded-2xl border border-gemini-surface transition-all"
              >
                <div className={`${feature.color} w-16 h-16 rounded-2xl bg-opacity-20 flex items-center justify-center mb-6`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gemini-text-primary mb-3">{feature.title}</h3>
                <p className="text-gemini-text-secondary">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section id="how-it-works" className="py-20 bg-gemini-background border-t border-gemini-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SlideUp delay={0.1}>
          <div className="text-center mb-16">
              <span className="inline-block bg-gemini-gradient bg-clip-text text-transparent px-3 py-1 rounded-full text-sm font-medium border border-gemini-surface mb-3">
                Process
              </span>
              <h2 className="text-3xl font-bold text-gemini-text-primary mb-4">How It Works</h2>
              <p className="text-xl text-gemini-text-secondary">Four simple steps to launch your startup</p>
          </div>
          </SlideUp>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                step: "01",
                title: "Submit Your Idea",
                description: "Share your startup concept and goals with our platform",
                icon: <Rocket className="h-10 w-10 text-gemini-blue" />,
                color: "bg-gemini-blue"
              },
              {
                step: "02",
                title: "AI Analysis",
                description: "Our AI agents analyze market potential and feasibility",
                icon: <Brain className="h-10 w-10 text-gemini-purple" />,
                color: "bg-gemini-purple"
              },
              {
                step: "03",
                title: "Get Insights",
                description: "Receive detailed reports and actionable recommendations",
                icon: <LineChart className="h-10 w-10 text-gemini-pink" />,
                color: "bg-gemini-pink"
              },
              {
                step: "04",
                title: "Start Building",
                description: "Use our tools and guidance to bring your idea to life",
                icon: <Code2 className="h-10 w-10 text-gemini-teal" />,
                color: "bg-gemini-teal"
              }
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative p-8 bg-gemini-card-gradient rounded-2xl border border-gemini-surface"
              >
                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                  <motion.div 
                    className={`w-12 h-12 rounded-full ${step.color} bg-opacity-20 flex items-center justify-center`}
                    whileHover={{ scale: 1.1 }}
                  >
                    {step.icon}
                  </motion.div>
                </div>
                <div className="mt-8">
                  <div className="text-sm font-medium text-gemini-text-secondary mb-2">Step {step.step}</div>
                  <h3 className="text-xl font-semibold text-gemini-text-primary mb-3">{step.title}</h3>
                  <p className="text-gemini-text-secondary">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-gemini-background border-t border-gemini-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SlideUp delay={0.1}>
          <div className="text-center mb-16">
              <span className="inline-block bg-gemini-gradient bg-clip-text text-transparent px-3 py-1 rounded-full text-sm font-medium border border-gemini-surface mb-3">
                Pricing
              </span>
              <h2 className="text-3xl font-bold text-gemini-text-primary mb-4">Simple, Transparent Pricing</h2>
              <p className="text-xl text-gemini-text-secondary">Choose the plan that's right for you</p>
          </div>
          </SlideUp>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                name: "Starter",
                price: "Free",
                features: [
                  "1 Startup Idea",
                  "Basic Market Research",
                  "Simple Validation Report",
                  "Community Support"
                ],
                color: "bg-gemini-blue",
                textColor: "text-gemini-blue"
              },
              {
                name: "Pro",
                price: "$49",
                popular: true,
                features: [
                  "5 Startup Ideas",
                  "Advanced Market Research",
                  "Detailed Validation",
                  "MVP Feature Planning",
                  "Priority Support"
                ],
                color: "bg-gemini-purple",
                textColor: "text-gemini-purple"
              },
              {
                name: "Enterprise",
                price: "Custom",
                features: [
                  "Unlimited Startup Ideas",
                  "Custom AI Agents",
                  "Advanced Analytics",
                  "Dedicated Support",
                  "API Access"
                ],
                color: "bg-gemini-pink",
                textColor: "text-gemini-pink"
              }
            ].map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ 
                  y: -5,
                  boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
                }}
                className={`bg-gemini-card-gradient rounded-2xl ${
                  plan.popular ? 'border-2 border-gemini-purple' : 'border border-gemini-surface'
                } p-8 relative transition-all overflow-hidden`}
              >
                {plan.popular && (
                  <div className="absolute top-0 right-0 transform translate-x-2 -translate-y-2">
                    <div className="bg-gemini-gradient text-gemini-text-primary text-xs font-bold px-3 py-1 rounded-full">
                      Popular
                    </div>
                  </div>
                )}
                <div className={`${plan.color} w-16 h-1 rounded-full bg-opacity-60 mb-6`}></div>
                <h3 className="text-xl font-semibold text-gemini-text-primary mb-2">{plan.name}</h3>
                <div className="text-3xl font-bold text-gemini-text-primary mb-6">
                  <span className={plan.textColor}>{plan.price}</span>
                  {plan.price !== "Custom" && <span className="text-lg text-gemini-text-secondary">/mo</span>}
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <motion.li 
                      key={i} 
                      className="flex items-start"
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 + (i * 0.1) }}
                      viewport={{ once: true }}
                    >
                      <CheckCircle className={`h-5 w-5 ${plan.textColor} mr-2 flex-shrink-0 mt-0.5`} />
                      <span className="text-gemini-text-secondary">{feature}</span>
                    </motion.li>
                  ))}
                </ul>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full py-3 rounded-full font-medium ${
                    plan.popular
                      ? 'bg-gemini-button-gradient text-gemini-text-primary' 
                      : 'bg-gemini-surface text-gemini-text-primary'
                  } transition-colors`}
                >
                  {plan.price === "Free" ? "Get Started" : "Subscribe"}
                </motion.button>
                {/* Decorative element */}
                <div className="absolute -right-12 -bottom-12 w-24 h-24 rounded-full opacity-5 bg-white"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gemini-background border-t border-gemini-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block bg-gemini-gradient bg-clip-text text-transparent px-3 py-1 rounded-full text-sm font-medium border border-gemini-surface mb-3">
              Testimonials
            </span>
            <h2 className="text-3xl font-bold text-gemini-text-primary mb-4">Loved by Founders</h2>
            <p className="text-xl text-gemini-text-secondary">See what others are saying about our platform</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                quote: "This platform helped me validate my startup idea in hours instead of weeks. The AI insights were incredibly valuable.",
                author: "Sarah Chen",
                role: "Founder, TechStart",
                color: "bg-gemini-blue"
              },
              {
                quote: "The MVP planning features saved us countless hours of development time. Highly recommended for technical founders.",
                author: "Michael Rodriguez",
                role: "CTO, BuildFast",
                color: "bg-gemini-purple"
              },
              {
                quote: "The market research insights helped us pivot our business model early, potentially saving us months of work.",
                author: "Emily Thompson",
                role: "CEO, GrowthLabs",
                color: "bg-gemini-pink"
              }
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-gemini-card-gradient p-8 rounded-2xl border border-gemini-surface relative overflow-hidden"
              >
                <div className={`${testimonial.color} w-16 h-1 rounded-full bg-opacity-60 mb-6`}></div>
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-gemini-yellow fill-current" />
                  ))}
                </div>
                <p className="text-gemini-text-secondary mb-6 relative z-10">{testimonial.quote}</p>
                <div className="relative z-10">
                  <div className="font-medium text-gemini-text-primary">{testimonial.author}</div>
                  <div className="text-gemini-text-secondary text-sm">{testimonial.role}</div>
                </div>
                {/* Decorative elements */}
                <div className="absolute -right-8 -bottom-8 w-16 h-16 rounded-full opacity-5 bg-white"></div>
                <div className="absolute -left-4 -top-4 w-8 h-8 rounded-full opacity-5 bg-white"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gemini-card-gradient border-t border-gemini-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative overflow-hidden">
          <motion.div 
            className="absolute top-0 left-0 w-full h-full opacity-20"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.2 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <div className="absolute -top-24 -right-24 w-48 h-48 rounded-full bg-gemini-blue opacity-20 blur-xl"></div>
            <div className="absolute -bottom-24 -left-24 w-48 h-48 rounded-full bg-gemini-purple opacity-20 blur-xl"></div>
          </motion.div>
          
          <div className="relative z-10">
            <span className="inline-block bg-gemini-gradient bg-clip-text text-transparent px-3 py-1 rounded-full text-sm font-medium border border-gemini-surface mb-3">
              Get Started
            </span>
            <h2 className="text-3xl font-bold text-gemini-text-primary mb-4">
            Ready to Start Your Startup Journey?
          </h2>
            <p className="text-xl text-gemini-text-secondary mb-8 max-w-2xl mx-auto">
            Join thousands of founders who are building the next big thing with our AI-powered platform.
          </p>
            <motion.button
            onClick={() => navigate('/dashboard')}
              className="bg-gemini-button-gradient text-gemini-text-primary px-8 py-4 rounded-full text-lg font-medium hover:bg-gemini-button-gradient-hover transition-all"
              whileHover={{ scale: 1.05, boxShadow: '0 0 25px rgba(138, 180, 248, 0.3)' }}
              whileTap={{ scale: 0.98 }}
          >
            Get Started for Free
            </motion.button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gemini-background text-gemini-text-secondary py-12 border-t border-gemini-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="inline-flex items-center">
                <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center">
                  <Sparkles className="h-5 w-5 text-white" />
                </div>
                <div className="ml-3 text-xl font-semibold">Ideation AI</div>
              </div>
              <p className="text-gemini-text-secondary">Building the future of startup innovation</p>
              <div className="mt-4 flex space-x-4">
                <motion.a 
                  href="#" 
                  className="w-8 h-8 rounded-full bg-gemini-card flex items-center justify-center"
                  whileHover={{ y: -2, backgroundColor: 'rgba(138, 180, 248, 0.2)' }}
                >
                  <svg className="w-4 h-4 text-gemini-blue" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                  </svg>
                </motion.a>
                <motion.a 
                  href="#" 
                  className="w-8 h-8 rounded-full bg-gemini-card flex items-center justify-center"
                  whileHover={{ y: -2, backgroundColor: 'rgba(197, 138, 249, 0.2)' }}
                >
                  <svg className="w-4 h-4 text-gemini-purple" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd"></path>
                  </svg>
                </motion.a>
                <motion.a 
                  href="#" 
                  className="w-8 h-8 rounded-full bg-gemini-card flex items-center justify-center"
                  whileHover={{ y: -2, backgroundColor: 'rgba(242, 139, 130, 0.2)' }}
                >
                  <svg className="w-4 h-4 text-gemini-pink" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.51 0 10-4.48 10-10S17.51 2 12 2zm6.605 4.61a8.502 8.502 0 011.93 5.314c-.281-.054-3.101-.629-5.943-.271-.065-.141-.12-.293-.184-.445a25.416 25.416 0 00-.564-1.236c3.145-1.28 4.577-3.124 4.761-3.362zM12 3.475c2.17 0 4.154.813 5.662 2.148-.152.216-1.443 1.941-4.48 3.08-1.399-2.57-2.95-4.675-3.189-5A8.687 8.687 0 0112 3.475zm-3.633.803a53.896 53.896 0 013.167 4.935c-3.992 1.063-7.517 1.04-7.896 1.04a8.581 8.581 0 014.729-5.975zM3.453 12.01v-.26c.37.01 4.512.065 8.775-1.215.25.477.477.965.694 1.453-.109.033-.228.065-.336.098-4.404 1.42-6.747 5.303-6.942 5.629a8.522 8.522 0 01-2.19-5.705zM12 20.547a8.482 8.482 0 01-5.239-1.8c.152-.315 1.888-3.656 6.703-5.337.022-.01.033-.01.054-.022a35.318 35.318 0 011.823 6.475 8.4 8.4 0 01-3.341.684zm4.761-1.465c-.086-.52-.542-3.015-1.659-6.084 2.679-.423 5.022.271 5.314.369a8.468 8.468 0 01-3.655 5.715z" clipRule="evenodd"></path>
                  </svg>
                </motion.a>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gemini-text-primary mb-4">Product</h3>
              <ul className="space-y-2">
                <motion.li whileHover={{ x: 2 }}>
                  <a href="#features" className="hover:text-gemini-blue transition-colors">Features</a>
                </motion.li>
                <motion.li whileHover={{ x: 2 }}>
                  <a href="#pricing" className="hover:text-gemini-blue transition-colors">Pricing</a>
                </motion.li>
                <motion.li whileHover={{ x: 2 }}>
                  <a href="#" className="hover:text-gemini-blue transition-colors">API</a>
                </motion.li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gemini-text-primary mb-4">Company</h3>
              <ul className="space-y-2">
                <motion.li whileHover={{ x: 2 }}>
                  <a href="#" className="hover:text-gemini-purple transition-colors">About</a>
                </motion.li>
                <motion.li whileHover={{ x: 2 }}>
                  <a href="#" className="hover:text-gemini-purple transition-colors">Blog</a>
                </motion.li>
                <motion.li whileHover={{ x: 2 }}>
                  <a href="#" className="hover:text-gemini-purple transition-colors">Careers</a>
                </motion.li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gemini-text-primary mb-4">Legal</h3>
              <ul className="space-y-2">
                <motion.li whileHover={{ x: 2 }}>
                  <a href="#" className="hover:text-gemini-pink transition-colors">Privacy</a>
                </motion.li>
                <motion.li whileHover={{ x: 2 }}>
                  <a href="#" className="hover:text-gemini-pink transition-colors">Terms</a>
                </motion.li>
                <motion.li whileHover={{ x: 2 }}>
                  <a href="#" className="hover:text-gemini-pink transition-colors">Security</a>
                </motion.li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gemini-surface mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p>© 2023 Ideation AI. All rights reserved.</p>
            <div className="mt-4 md:mt-0">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                className="text-xs bg-gemini-card px-3 py-1 rounded-full hover:bg-gemini-surface transition-colors"
              >
                Privacy Policy
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                className="text-xs bg-gemini-card px-3 py-1 rounded-full ml-2 hover:bg-gemini-surface transition-colors"
              >
                Terms of Service
              </motion.button>
            </div>
          </div>
        </div>
      </footer>
    </motion.div>
  );
};

export default LandingPage;