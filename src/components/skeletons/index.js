import React from 'react';
import Skeleton, { SkeletonContainer } from '../Skeleton';

/**
 * Skeleton loader for About Section
 */
export const AboutSectionSkeleton = () => {
  return (
    <section className="pt-20 bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
      <div className="lg:ml-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Skeleton */}
        <div className="text-center mb-16">
          <Skeleton variant="text" width="300px" height="48px" className="mx-auto mb-4" />
          <Skeleton variant="text" width="600px" height="24px" className="mx-auto" />
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 items-start mb-16">
          {/* Left Column - Story */}
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
              <div className="flex items-center space-x-3 mb-6">
                <Skeleton variant="circular" width="48px" height="48px" />
                <Skeleton variant="text" width="150px" height="28px" />
              </div>
              <SkeletonContainer>
                <Skeleton variant="text" />
                <Skeleton variant="text" />
                <Skeleton variant="text" width="90%" />
                <Skeleton variant="text" />
                <Skeleton variant="text" width="80%" />
              </SkeletonContainer>
            </div>

            <div className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl p-8">
              <div className="flex items-center space-x-3 mb-4">
                <Skeleton variant="circular" width="32px" height="32px" className="bg-white/20" />
                <Skeleton variant="text" width="150px" className="bg-white/20" />
              </div>
              <Skeleton variant="text" className="bg-white/20" />
              <Skeleton variant="text" className="bg-white/20" />
              <Skeleton variant="text" width="70%" className="bg-white/20" />
            </div>
          </div>

          {/* Right Column - Stats & Skills */}
          <div className="space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                  <Skeleton variant="circular" width="48px" height="48px" className="mx-auto mb-3" />
                  <Skeleton variant="text" width="60px" height="32px" className="mx-auto mb-1" />
                  <Skeleton variant="text" width="100%" height="16px" />
                </div>
              ))}
            </div>

            {/* Skills */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
              <div className="flex items-center mb-6">
                <Skeleton variant="circular" width="32px" height="32px" className="mr-3" />
                <Skeleton variant="text" width="150px" height="24px" />
              </div>
              <div className="space-y-6">
                {[1, 2, 3].map((category) => (
                  <div key={category}>
                    <Skeleton variant="text" width="100px" height="20px" className="mb-3" />
                    <div className="flex flex-wrap gap-2">
                      {[1, 2, 3, 4].map((skill) => (
                        <Skeleton key={skill} variant="rounded" width="80px" height="32px" />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/**
 * Skeleton loader for Skills Page
 */
export const SkillsPageSkeleton = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-6xl mx-auto p-6 lg:ml-24">
        {/* Header */}
        <div className="text-center mb-12">
          <Skeleton variant="circular" width="64px" height="64px" className="mx-auto mb-6" />
          <Skeleton variant="text" width="300px" height="32px" className="mx-auto mb-4" />
          <Skeleton variant="text" width="600px" height="20px" className="mx-auto" />
        </div>

        {/* Tab Navigation */}
        <div className="relative">
          <div className="flex border-b border-gray-200 dark:border-gray-700">
            {[1, 2, 3, 4, 5, 6, 7].map((tab) => (
              <div key={tab} className="flex-1 px-6 py-4">
                <Skeleton variant="text" width="80px" height="20px" className="mx-auto" />
              </div>
            ))}
          </div>
        </div>

        {/* Search Bar */}
        <div className="bg-white dark:bg-gray-800 rounded-t-2xl shadow-lg mt-8">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <Skeleton variant="rectangular" width="400px" height="40px" />
          </div>
        </div>

        {/* Skills Table */}
        <div className="bg-white dark:bg-gray-800 rounded-b-2xl shadow-lg">
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-100 dark:bg-gray-700">
                <tr>
                  {['Technology', 'Level', 'Progress', 'Proficiency'].map((header) => (
                    <th key={header} className="py-3 px-4">
                      <Skeleton variant="text" width="100px" height="16px" />
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[1, 2, 3, 4, 5, 6].map((row) => (
                  <tr key={row} className="border-b border-gray-100 dark:border-gray-700">
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <Skeleton variant="circular" width="20px" height="20px" />
                        <Skeleton variant="text" width="100px" />
                      </div>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <Skeleton variant="rounded" width="80px" height="24px" className="mx-auto" />
                    </td>
                    <td className="py-4 px-4">
                      <Skeleton variant="rectangular" width="100%" height="8px" />
                    </td>
                    <td className="py-4 px-4 text-center">
                      <Skeleton variant="text" width="40px" className="mx-auto" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden space-y-4 p-4">
            {[1, 2, 3, 4].map((card) => (
              <div key={card} className="bg-white dark:bg-gray-700 rounded-lg p-4 shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <Skeleton variant="text" width="120px" />
                  <Skeleton variant="text" width="40px" />
                </div>
                <Skeleton variant="rounded" width="80px" height="24px" className="mb-2" />
                <Skeleton variant="rectangular" width="100%" height="8px" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * Skeleton loader for Work Experience
 */
export const WorkExperienceSkeleton = () => {
  return (
    <section className="bg-white dark:bg-gray-800 py-16">
      <div className="max-w-6xl mx-auto p-6 lg:ml-24">
        {/* Header */}
        <div className="text-center mb-12">
          <Skeleton variant="circular" width="64px" height="64px" className="mx-auto mb-6" />
          <Skeleton variant="text" width="200px" height="32px" className="mx-auto mb-4" />
          <Skeleton variant="text" width="500px" height="20px" className="mx-auto" />
        </div>

        {/* Timeline */}
        <div className="relative">
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 to-blue-300"></div>
          
          {[1, 2, 3, 4].map((exp) => (
            <div key={exp} className="relative mb-12 last:mb-0">
              {/* Timeline dot */}
              <div className="absolute left-4 w-8 h-8 bg-white dark:bg-gray-700 border-4 border-blue-500 rounded-full"></div>
              
              {/* Content card */}
              <div className="ml-20 bg-white dark:bg-gray-700 rounded-2xl shadow-lg p-8">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                  <div>
                    <Skeleton variant="text" width="250px" height="24px" className="mb-2" />
                    <Skeleton variant="text" width="200px" height="18px" />
                  </div>
                  <div className="flex flex-col sm:items-end gap-2 mt-2 sm:mt-0">
                    <Skeleton variant="rounded" width="120px" height="24px" />
                    <Skeleton variant="text" width="100px" height="16px" />
                  </div>
                </div>
                <Skeleton variant="text" className="mb-1" />
                <Skeleton variant="text" className="mb-1" />
                <Skeleton variant="text" width="70%" className="mb-6" />
                <div className="flex flex-wrap gap-2">
                  {[1, 2, 3].map((tag) => (
                    <Skeleton key={tag} variant="rounded" width="80px" height="28px" />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/**
 * Skeleton loader for Education Section
 */
export const EducationSectionSkeleton = () => {
  return (
    <section className="bg-gray-50 dark:bg-gray-900 py-16">
      <div className="max-w-6xl mx-auto p-6 lg:ml-24">
        {/* Header */}
        <div className="text-center mb-12">
          <Skeleton variant="circular" width="64px" height="64px" className="mx-auto mb-6" />
          <Skeleton variant="text" width="300px" height="32px" className="mx-auto mb-4" />
          <Skeleton variant="text" width="600px" height="20px" className="mx-auto" />
        </div>

        {/* Education Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {[1, 2, 3].map((edu) => (
            <div key={edu} className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
              {/* Card Header */}
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-6">
                <Skeleton variant="rounded" width="100px" height="24px" className="bg-white/20 mb-4" />
                <Skeleton variant="text" className="bg-white/20 mb-2" />
                <Skeleton variant="text" width="80%" className="bg-white/20 mb-2" />
                <Skeleton variant="text" width="120px" className="bg-white/20" />
              </div>

              {/* Card Body */}
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <Skeleton variant="circular" width="20px" height="20px" className="mr-2" />
                  <Skeleton variant="text" width="150px" />
                </div>
                <Skeleton variant="text" className="mb-1" />
                <Skeleton variant="text" className="mb-1" />
                <Skeleton variant="text" width="80%" className="mb-6" />
                
                <Skeleton variant="text" width="100px" className="mb-3" />
                <div className="flex flex-wrap gap-2">
                  {[1, 2, 3].map((subject) => (
                    <Skeleton key={subject} variant="rounded" width="90px" height="24px" />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/**
 * Skeleton loader for Contact Form
 */
export const ContactFormSkeleton = () => {
  return (
    <div className="lg:col-span-2">
      <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
        <div className="flex items-center mb-6">
          <Skeleton variant="circular" width="40px" height="40px" className="mr-3" />
          <Skeleton variant="text" width="200px" height="28px" />
        </div>
        
        <div className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <Skeleton variant="text" width="100px" height="16px" className="mb-2" />
              <Skeleton variant="rectangular" height="48px" />
            </div>
            <div>
              <Skeleton variant="text" width="120px" height="16px" className="mb-2" />
              <Skeleton variant="rectangular" height="48px" />
            </div>
          </div>
          
          <div>
            <Skeleton variant="text" width="80px" height="16px" className="mb-2" />
            <Skeleton variant="rectangular" height="48px" />
          </div>
          
          <div>
            <Skeleton variant="text" width="100px" height="16px" className="mb-2" />
            <Skeleton variant="rectangular" height="120px" />
          </div>
          
          <Skeleton variant="rectangular" height="56px" />
        </div>
      </div>
    </div>
  );
};

/**
 * Skeleton loader for FAQ Accordion
 */
export const FAQAccordionSkeleton = () => {
  return (
    <section className="pt-10 bg-gray-50 dark:bg-gray-900">
      <div className="lg:ml-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <Skeleton variant="text" width="400px" height="48px" className="mx-auto mb-4" />
          <Skeleton variant="text" width="600px" height="24px" className="mx-auto" />
        </div>

        {/* Accordion Container */}
        <div className="flex justify-center pb-16">
          <div className="w-full max-w-4xl bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
            {[1, 2, 3, 4, 5].map((item) => (
              <div key={item} className="border-b border-gray-200 dark:border-gray-700 last:border-b-0 p-6">
                <div className="flex items-center justify-between">
                  <Skeleton variant="text" width="70%" height="20px" />
                  <Skeleton variant="circular" width="20px" height="20px" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

/**
 * Skeleton loader for Project Card
 */
export const ProjectCardSkeleton = () => {
    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        <Skeleton variant="rectangular" height="200px" />
        <div className="p-6">
            <Skeleton variant="text" width="150px" height="24px" className="mb-2" />
            <Skeleton variant="text" className="mb-1" />
            <Skeleton variant="text" className="mb-1" />
            <Skeleton variant="text" width="80%" className="mb-4" />
            <div className="flex flex-wrap gap-2 mb-4">
            {[1, 2, 3].map((tag) => (
                <Skeleton key={tag} variant="rounded" width="60px" height="24px" />
            ))}
            </div>
            <div className="flex justify-between">
            <Skeleton variant="rounded" width="100px" height="36px" />
            <Skeleton variant="rounded" width="100px" height="36px" />
            </div>
        </div>
        </div>
    );
};

/**
 * Skeleton loader for Projects Page
 */
export const ProjectsPageSkeleton = () => {
    return (
        <div className="bg-white dark:bg-gray-900 min-h-screen">
        <div className="max-w-6xl mx-auto p-6 lg:ml-24">
            {/* Header */}
            <div className="text-center mb-12">
            <Skeleton variant="circular" width="64px" height="64px" className="mx-auto mb-6" />
            <Skeleton variant="text" width="200px" height="32px" className="mx-auto mb-4" />
            <Skeleton variant="text" width="500px" height="20px" className="mx-auto" />
            </div>

            {/* Filter Tabs */}
            <div className="flex flex-wrap justify-center gap-2 mb-8">
            {[1, 2, 3, 4, 5].map((tab) => (
                <Skeleton key={tab} variant="rounded" width="100px" height="36px" />
            ))}
            </div>

            {/* Search Bar */}
            <div className="max-w-md mx-auto mb-8">
            <Skeleton variant="rectangular" height="48px" />
            </div>

            {/* Projects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((project) => (
                <ProjectCardSkeleton key={project} />
            ))}
            </div>
        </div>
        </div>
    );
};