'use client'
import Link from '@/components/Link'
import Tag from '@/components/Tag'
import siteMetadata from 'public/data/siteMetadata'
import { formatDate } from 'pliny/utils/formatDate'
import NewsletterForm from 'pliny/ui/NewsletterForm'
import { sortPosts, allCoreContent } from 'pliny/utils/contentlayer'
import { allBlogs } from 'contentlayer/generated'
import Image from 'next/image'

const MAX_DISPLAY = 5

export default function Page() {
  const sortedPosts = sortPosts(allBlogs)
  const posts = allCoreContent(sortedPosts)

  const saveCurrentPage = (article) => {
    localStorage.setItem('savedArticle', JSON.stringify(article));
  };
  
  return (
    <>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pb-8 pt-6 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            Latest
          </h1>
          <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
            Last updated on Friday, August 3rd, 2023 @ 10:30 AM
          </p>
        </div>
        <ul className="grid lg:grid-cols-2 gap-6">
          {!posts.length && 'No posts found.'}
          {posts.slice(0, MAX_DISPLAY).map((post) => {
            const { slug, date, title, summary, tags } = post
            return (
              <li key={slug} className="py-12">
                <article>
                  <div className="">
                  {/* <!-- Card --> */}
                    <a className="group relative block rounded-xl dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600" href={`/latest/blog/${slug}`} onClick={() => saveCurrentPage(slug)}>
                      <div className="flex-shrink-0 relative rounded-xl overflow-hidden w-full h-[350px] before:absolute before:inset-x-0 before:size-full before:bg-gradient-to-t before:from-gray-900/[.7] before:z-[1]">
                        <Image className="size-full absolute top-0 start-0 object-cover" src="https://images.unsplash.com/photo-1669828230990-9b8583a877ab?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1062&q=80" alt="Image Description" width={1000} height={250} />
                      </div>

                      <div className="absolute top-0 inset-x-0 z-10">
                        <div className="p-4 flex flex-col h-full sm:p-6">
                          {/* <!-- Avatar --> */}
                          <div className="flex items-center">
                            <div className="flex-shrink-0">
                              <Image className="size-[46px] border-2 border-white rounded-full" src="https://images.unsplash.com/photo-1669837401587-f9a4cfe3126e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=320&h=320&q=80" alt="Image Description" width={25} height={25}/>
                            </div>
                            <div className="ms-2.5 sm:ms-4">
                              <h4 className="font-semibold text-white">
                                Gloria
                              </h4>
                              <p className="text-xs text-white/[.8]">
                                {formatDate(date, siteMetadata.locale)}
                              </p>
                            </div>
                          </div>
                          {/* <!-- End Avatar --> */}
                        </div>
                      </div>

                      <div className="absolute bottom-0 inset-x-0 z-10">
                        <div className="flex flex-col h-full p-4 sm:p-6">
                          <h3 className="text-lg sm:text-3xl font-semibold text-white group-hover:text-white/[.8]">
                            {title}
                          </h3>
                          <p className="mt-2 text-white/[.8]">
                            {summary}
                          </p>
                        </div>
                      </div>
                    </a>
                    {/* <!-- End Card --> */}
                    {/* <dl>
                      <dt className="sr-only">Published on</dt>
                      <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                        <time dateTime={date}>{formatDate(date, siteMetadata.locale)}</time>
                      </dd>
                    </dl>
                    <div className="space-y-5 xl:col-span-3">
                      <div className="space-y-6">
                        <div>
                          <h2 className="text-2xl font-bold leading-8 tracking-tight">
                            <Link
                              href={`/latest/blog/${slug}`}
                              className="text-gray-900 dark:text-gray-100"
                              onClick={() => saveCurrentPage(slug)}
                            >
                              {title}
                            </Link>
                          </h2>
                          <div className="flex flex-wrap">
                            {tags.map((tag) => (
                              <Tag key={tag} text={tag} />
                            ))}
                          </div>
                        </div>
                        <div className="prose max-w-none text-gray-500 dark:text-gray-400">
                          {summary}
                        </div>
                      </div>
                      <div className="text-base font-medium leading-6">
                        <Link
                          href={`/latest/blog/${slug}`}
                          className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                          aria-label={`Read more: "${title}"`}
                        >
                          Read more &rarr;
                        </Link>
                      </div>
                    </div> */}
                  </div>
                </article>
              </li>
            )
          })}
        </ul>
      </div>
      {posts.length > MAX_DISPLAY && (
        <div className="flex justify-end text-base font-medium leading-6">
          <Link
            href="/latest/blog"
            className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
            aria-label="All posts"
          >
            All Posts &rarr;
          </Link>
        </div>
      )}
      {siteMetadata.newsletter?.provider && (
        <div className="flex items-center justify-center pt-4">
          <NewsletterForm />
        </div>
      )}
    </>
  )
}
