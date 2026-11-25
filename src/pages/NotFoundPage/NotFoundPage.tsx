import InfoState from "@/components/InfoState/InfoState";
import Main from "@/components/layout/Main/Main";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

export default function NotFoundPage() {
  useDocumentTitle("Сторінку не знайдено");

  return (
    <Main>
      <InfoState
        title="Опа... щось пішло не так"
        message="я тут глянув, але не знайшов цю сторінку, можеш перейти на головну або ж на минулу сторінку, та там спробувати знову?"
        situation="notFound"
        titleComponent="h1"
      />
    </Main>
  );
}
