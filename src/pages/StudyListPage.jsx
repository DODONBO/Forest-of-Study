import { useEffect, useState } from "react";
import StudyCard from "../components/study/StudyCard";
import RecentStudyList from "../components/study/RecentStudyList";
import SearchSortBar from "../components/study/SearchSortBar";

import tagImg from "../assets/img/ic_point.svg";

function StudyListPage() {
  const [items, setItems] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [sortValue, setSortValue] = useState("latest");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchStudies = (targetPage, replace) => {
    const params = new URLSearchParams({
      page: targetPage,
      pageSize: 6,
      sort: sortValue,
    });

    if (keyword) params.append("keyword", keyword);

    fetch(`http://127.0.0.1:3000/study?${params.toString()}`)
      .then((res) => res.json())
      .then((res) => {
        const { items: newItems, totalPages: tp } = res.data;
        setItems((prev) => (replace ? newItems : [...prev, ...newItems]));
        setTotalPages(tp);
        setPage(targetPage);
      });
  };

  useEffect(() => {
    fetchStudies(1, true);
  }, [keyword, sortValue]);

  const handleLoadMore = () => {
    fetchStudies(page + 1, false);
  };

  return (
    <section>
      <div className="inner">
        <RecentStudyList />

        <div className="card_container">
          <span className="container_title">스터디 둘러보기</span>

          <SearchSortBar
            keyword={keyword}
            onKeywordChange={setKeyword}
            sortValue={sortValue}
            onSortChange={setSortValue}
          />

          {items.length === 0 ? (
            <p className="empty_text">아직 둘러 볼 스터디가 없어요</p>
          ) : (
            <div className="card_wrap">
              {items.map((study) => (
                <StudyCard key={study.id} study={study} />
              ))}
            </div>
          )}

          {page < totalPages && (
            <button className="load_more_button" onClick={handleLoadMore}>
              더보기
            </button>
          )}
        </div>
      </div>
    </section>
  );
}

export default StudyListPage;
