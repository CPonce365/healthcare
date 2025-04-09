import React from 'react'
import Slider from "react-slick";
import FeedbackCard from './FeedbackCard';

const testimonials = [
  {
    name: 'Dora Explorer',
    role: 'UI/UX Designer — Austin, TX',
    message:
      'VitalSync helped me identify patterns in my energy levels I never noticed before. The daily check-ins are now part of my wellness routine. I love how I can reflect on my past entries and see what days were more stressful or productive. It’s honestly become an essential part of my mornings.',
  },
  {
    name: 'Samuel Green',
    role: 'Freelance Developer — Berlin, Germany',
    message:
      'I love how simple yet powerful the interface is. The AI suggestions feel personalized and actually helped me catch a recurring sleep issue. I didn’t realize how inconsistent my patterns were until VitalSync started pointing it out. It’s like having a mini health coach in my pocket.',
  },
  {
    name: 'Amina El-Sayed',
    role: 'Yoga Instructor — Vancouver, Canada',
    message:
      'VitalSync keeps me accountable and lets me track both physical and mental health easily. The charts are beautiful and insightful! I also use it with my students to encourage more self-awareness. It really promotes mindfulness through data in the most non-intrusive way.',
  },
  {
    name: 'Carlos Mendoza',
    role: 'Paramedic — Phoenix, AZ',
    message:
      'With my rotating shifts, I needed something that could help me track how my irregular sleep and stress levels affect me. VitalSync made it possible to monitor trends and give me actionable feedback without feeling overwhelming. I recommend it to everyone in the emergency field.',
  },
  {
    name: 'Sophie Duval',
    role: 'Graduate Student — Paris, France',
    message:
      'Between classes, internships, and research, I needed a wellness tool that didn’t require too much maintenance. VitalSync fits perfectly into my daily routine. I especially love the AI insights — they make me feel seen without needing to pour hours into data entry.',
  },
  {
    name: 'Marcus Reid',
    role: 'Fitness Coach — Atlanta, GA',
    message:
      'I’ve tested tons of health tracking apps, but VitalSync is on another level. It’s clean, smart, and doesn’t overload you. I use it not only for myself but to monitor how my clients are feeling between sessions. The symptom logs are super intuitive and flexible.',
  }
];


const Feedback = () => {
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className='w-full bg-white py-32'>
      <div className='md:max-w-[1480px] m-auto max-w-[600px] px-4 md:px-0'>
        <div className='py-4'>
          <h1 className='py-3 text-3xl font-bold'>
            Our <span className='text-[#20B486]'>Feedback</span>
          </h1>
          <p className='text-[#6D737A]'>
            Satisfied Customers
          </p>
        </div>

        <Slider {...settings}>
          {testimonials.map((testimonial, index) => (
            <FeedbackCard
              key={index}
              name={testimonial.name}
              role={testimonial.role}
              message={testimonial.message}
            />
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Feedback;
