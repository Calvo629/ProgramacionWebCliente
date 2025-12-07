import TrackCard from '@/components/TrackCard';

export default async function TrackDetailPage({ params }) {
  const { id } = await params;
  return (
    <div className="p-8">
      <TrackCard trackId={id} />
    </div>
  );
}