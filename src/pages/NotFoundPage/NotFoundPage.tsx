import InfoState from "@/components/InfoState/InfoState";

export default function NotFoundPage() {
  return (
    <InfoState
      title="Опа... щось пішло не так"
      message="я тут глянув, але не знайшов цю сторінку, можеш перейти на головну або ж на минулу сторінку, та там спробувати знову?"
      situation="notFound"
    />
  );
}
