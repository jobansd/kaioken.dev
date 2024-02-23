import { TabGroup } from "$/components/TabGroup"
import { TerminalCodeBlock } from "$/components/TerminalCodeBlock"
import { createStore, useModel, useState } from "kaioken"

const useSelectionStore = createStore("CSR", (set) => ({
  setSelected: (value: string) => set(value),
}))

function CSRBash({ dirname }: { dirname: string }) {
  return (
    <TerminalCodeBlock
      className="rounded-b-lg rounded-tr-lg"
      code={`mkdir ${dirname || "my-app"}
cd ${dirname || "my-app"}
git clone https://github.com/CrimsonChi/kaioken-csr-template.git .
rm -rf .git
pnpm i
pnpm dev`}
    />
  )
}
function SSRBash({ dirname }: { dirname: string }) {
  return (
    <TerminalCodeBlock
      className="rounded-b-lg rounded-tr-lg"
      code={`mkdir ${dirname || "my-app"}
cd ${dirname || "my-app"}
git clone https://github.com/CrimsonChi/kaioken-ssr-template.git .
rm -rf .git
pnpm i
pnpm dev`}
    />
  )
}

export function GitCloneCode() {
  const { value: selectedItem, setSelected } = useSelectionStore()
  const [ref, txt] = useModel("")
  return (
    <div>
      <div className="flex gap-2">
        <TabGroup
          value={selectedItem}
          onSelect={setSelected}
          items={["CSR", "SSR"]}
        />
        <input
          ref={ref}
          placeholder="my-app"
          className="px-2 text-sm w-full xs:w-auto"
        />
      </div>
      {selectedItem === "CSR" ? (
        <CSRBash dirname={txt} />
      ) : (
        <SSRBash dirname={txt} />
      )}
    </div>
  )
}