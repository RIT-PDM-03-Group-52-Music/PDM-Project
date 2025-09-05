import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export function App() {
    const { data, error, isLoading } = useSWR("/api/health", fetcher, {
        refreshInterval: 5000,
    });

    if (isLoading) return <p>Loading…</p>;
    if (error) return <p>Error loading</p>;

    return <div className="p-4">{JSON.stringify(data, null, 2)}</div>;
}
