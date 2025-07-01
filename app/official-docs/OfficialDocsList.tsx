"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { fetchOfficialDocs } from "./api";
import { PlusCircle } from "lucide-react";
import Pagination from "@/components/ui/Pagination";

export default function OfficialDocsList() {
  const [keyword, setKeyword] = useState("");
  const [page, setPage] = useState(1);

  const { data, isLoading } = useQuery({
    queryKey: ["officialDocs", keyword, page],
    queryFn: () => fetchOfficialDocs(keyword, page),
  });

  const handleSearch = () => setPage(1);
  const handleReset = () => {
    setKeyword("");
    setPage(1);
  };

  return (
    <div className="p-6 space-y-4">
      <div className="flex items-center gap-2">
        <Input
          placeholder="공문명을 입력해주세요"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <Button onClick={handleSearch}>검색</Button>
        <Button variant="outline" onClick={handleReset}>초기화</Button>
        <div className="ml-auto">
          <Button variant="default">
            <PlusCircle className="mr-2 h-4 w-4" />
            공문 등록
          </Button>
        </div>
      </div>

      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="border rounded-lg">
          <table className="w-full table-auto text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left">제목</th>
                <th className="px-4 py-2">작성자</th>
                <th className="px-4 py-2">작성일</th>
              </tr>
            </thead>
            <tbody>
              {data?.data.map((doc) => (
                <tr key={doc.id} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-2">{doc.title}</td>
                  <td className="px-4 py-2 text-center">{doc.author}</td>
                  <td className="px-4 py-2 text-center">{doc.createdAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <Pagination
            currentPage={page}
            totalPages={Math.ceil(data?.total / 10)}
            onChange={(newPage) => setPage(newPage)}
          />
        </div>
      )}
    </div>
  );
}