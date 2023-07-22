import SampleForm from "@/components/SampleForm";

export default function Home() {
  return (
    <SampleForm
      onSubmit={(data) => {
        alert(JSON.stringify(data));
      }}
    />
  );
}
