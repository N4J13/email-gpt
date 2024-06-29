"use client";

import { Email } from "@/lib/types";
import EmailCard from "@/components/email-card";
import Header from "@/components/header";
import { useEffect, useMemo, useState } from "react";
import MailDashboardSkelton from "@/components/skeleton-loader";
import { capitalize } from "@/lib/utils";
import { MailWarning } from "lucide-react";

export default function Home({ params }: { params: { slug: string } }) {
  const [emails, setEmails] = useState<Email[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [categories, setCategories] = useState([]);
  const [filterBy, setFilterBy] = useState("");

  useEffect(() => {
    const getInbox = async () => {
      try {
        const apiKey =  localStorage.getItem("openai-api-key")
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/email/${params.slug}?openaiApiKey=${apiKey}`,
          {
            credentials: "include",
          }
        );
        const data = await response.json();
        setEmails(data.data);

        setLoading(false);
      } catch (error) {
        console.error(error);
        setError(true);
        setLoading(false);
      }
    };

    getInbox();
  }, [params.slug]);

  useEffect(() => {
    const uniqueCategories: Set<string> = new Set();
    emails.forEach((email) => {
      email.category.forEach((cat) => uniqueCategories.add(cat));
    });
    setCategories([...uniqueCategories]);
  }, [emails]);

  const filterEmails = useMemo(() => {
    let filteredEmails = emails;
    if (filterBy) {
      filteredEmails = emails.filter((email) =>
        email.category.includes(capitalize(filterBy))
      );
    }
    return filteredEmails;
  }, [emails, filterBy]);

  if (error) return <ErrorComponent />;

  return (
    <main className="flex-1 flex flex-col">
      <Header
        sortItems={categories}
        loading={loading}
        title={capitalize(params.slug)}
        filterBy={filterBy}
        serFilterBy={setFilterBy}
      />
      {loading && <MailDashboardSkelton />}
      {!loading && (
        <div className="flex-1 overflow-y-auto p-8">
          <div className="grid grid-cols-1   p-4 gap-8 ">
            {filterEmails.map((email: Email) => (
              <EmailCard key={email.id} email={email} />
            ))}
          </div>
        </div>
      )}
    </main>
  );
}

const ErrorComponent = () => {
  return (
    <div className="flex-1 flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="flex justify-center items-center bg-muted w-40 h-40 rounded-full">
          <MailWarning size={64} />
        </div>
        <p className="text-lg text-primary">
          We are unable to fetch your emails
        </p>
      </div>
    </div>
  );
};
