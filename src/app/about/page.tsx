import React from 'react';

const AboutPage = () => {
  return (
    <main className="max-w-5xl mx-auto px-6 py-12">
      {/* Header Section */}
      <header className="flex flex-col items-center text-center mb-16">
        <h1 className="text-4xl font-bold mb-2">Saksham Srivastava</h1>
        <p className="text-lg text-white-600 max-w-xl mb-1">
          Computer Engineering junior focused on AI systems, compiler design, and full-stack development.
        </p>
        <p className="text-md text-white mb-1">Tampa, FL</p>
        <p className="text-md text-white max-w-xl">
          <a href="mailto:srivastava1@usf.edu" className="text-blue-600 hover:underline">srivastava1@usf.edu</a> |{' '}
          <a href="https://linkedin.com/in/sakshamsriv" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
            LinkedIn
          </a> |{' '}
          <a href="https://github.com/saksham-45" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
            GitHub
          </a>
        </p>
      </header>

      {/* Skills Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-semibold mb-6 border-b-2 border-gray-300 pb-2">Skills</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          <div>
            <h3 className="text-xl font-semibold mb-2">Programming</h3>
            <ul className="text-white-200 list-disc list-inside">
              <li>Python, C, C++, Java, Dart</li>
              <li>JavaScript, TypeScript, HTML, CSS</li>
              <li>Flutter, React, Next.js</li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">Machine Learning & Data</h3>
            <ul className="text-white-200 list-disc list-inside">
              <li>TensorFlow, OpenCV</li>
              <li>scikit-learn, Pandas, NumPy</li>
              <li>Computer Vision, NLP, Deep Learning</li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">Systems & Tools</h3>
            <ul className="text-white-200 list-disc list-inside">
              <li>Git, Docker, Linux</li>
              <li>LLVM, Compiler Design</li>
              <li>Unity3D, C#</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-semibold mb-6 border-b-2 border-gray-300 pb-2">Projects</h2>
        <div className="grid gap-8 sm:grid-cols-2">
          <div className="border rounded-lg p-6 shadow hover:shadow-lg transition-shadow">
            <h3 className="text-2xl font-semibold mb-2">MoodScope</h3>
            <p className="text-white-200 mb-4">
              Developed an AI-based application that detects human emotions through facial expressions using Python, OpenCV, and TensorFlow.
            </p>
          </div>

          <div className="border rounded-lg p-6 shadow hover:shadow-lg transition-shadow">
            <h3 className="text-2xl font-semibold mb-2">DSL Compiler</h3>
            <p className="text-white-200 mb-4">
              Designed and implemented a domain-specific language compiler using Python and LLVM, focusing on compiler design principles and optimizations.
            </p>
          </div>

          <div className="border rounded-lg p-6 shadow hover:shadow-lg transition-shadow">
            <h3 className="text-2xl font-semibold mb-2">Grassland</h3>
            <p className="text-white-200 mb-4">
              Created an interactive 3D game environment using Unity3D and C#, showcasing immersive gameplay and dynamic terrain generation.
            </p>
          </div>

          <div className="border rounded-lg p-6 shadow hover:shadow-lg transition-shadow">
            <h3 className="text-2xl font-semibold mb-2">SnackChat</h3>
            <p className="text-white-200 mb-4">
              Developed a cross-platform chat application using Flutter and Dart featuring snack-themed emojis and real-time messaging capabilities.
            </p>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-semibold mb-6 border-b-2 border-gray-300 pb-2">Experience</h2>
        <div className="border rounded-lg p-6 shadow">
          <h3 className="text-2xl font-semibold mb-2">Project Intern</h3>
          <p className="italic text-white-200 mb-2">Greenpeace India | Sep 2020 – Feb 2021</p>
          <ul className="list-disc list-inside text-white-200">
            <li>Researched and analyzed environmental data to support Greenpeace campaigns.</li>
            <li>Assisted in developing outreach materials to increase public awareness on sustainability.</li>
            <li>Collaborated with cross-functional teams to organize community engagement events.</li>
          </ul>
        </div>
      </section>

      {/* Leadership & Activities Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-semibold mb-6 border-b-2 border-gray-300 pb-2">Leadership & Activities</h2>
        <div className="border rounded-lg p-6 shadow">
          <h3 className="text-xl font-semibold mb-2">IEEE Computer Society & Google Developer Student Clubs (GDSC)</h3>
          <p className="text-white-200">
            Active member contributing to workshops, hackathons, and tech talks focused on software development, AI, and community building.
          </p>
        </div>
      </section>

      {/* Volunteer & Community Impact Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-semibold mb-6 border-b-2 border-gray-300 pb-2">Volunteer & Community Impact</h2>
        <div className="border rounded-lg p-6 shadow">
          <ul className="list-disc list-inside text-gray-200">
            <li>Organized coding bootcamps for underprivileged youth to promote STEM education.</li>
            <li>Participated in environmental clean-up drives and awareness campaigns.</li>
            <li>Mentored junior students in programming and project development.</li>
          </ul>
        </div>
      </section>
    </main>
  );
};

export default AboutPage;
