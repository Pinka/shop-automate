import { redirect } from "next/navigation";

export default async function Home() {
  return (
    <div className="flex flex-col max-w-lg m-auto items-center">
      <h1 className="font-semibold text-lg p-3">Choose automation</h1>

      <form action={selectAutomation}>
        <button
          type="submit"
          name="automation"
          value="clone"
          className="border p-2 w-full hover:bg-gray-100"
        >
          <h2>Create similar products based on existing design</h2>
        </button>
      </form>
    </div>
  );
}

const selectAutomation = async (formData: FormData) => {
  "use server";
  const automation = formData.get("automation");

  if (automation === "clone") {
    redirect("/cloneProduct");
  }
};
