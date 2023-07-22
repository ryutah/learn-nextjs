import type { Meta, StoryObj } from "@storybook/react";

import SampleForm from "@/components/SampleForm";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: "form-validation/SampleForm",
  component: SampleForm,
  tags: ["autodocs"],
} satisfies Meta<typeof SampleForm>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: Story = {
  parameters: {
    actions: {
      typeRegex: "^on.*",
    },
  },
};
