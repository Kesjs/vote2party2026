'use client';

import dynamic from 'next/dynamic';

const VoteForm = dynamic(() => import('./VoteForm'), {
  ssr: false,
  loading: () => <div className="text-center py-12">Chargement du formulaire...</div>
});

export default function VoteFormWrapper() {
  return <VoteForm />;
}
