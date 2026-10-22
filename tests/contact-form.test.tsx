import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { toast } from "sonner";
import { CONTACT_TOAST, ContactForm } from "@/components/copper/contact-form";
import Home from "@/app/page";

vi.mock("sonner", () => ({ toast: { success: vi.fn() } }));

const fill = (label: string, value: string) =>
  fireEvent.change(screen.getByLabelText(label), { target: { value } });

describe("ContactForm", () => {
  beforeEach(() => vi.mocked(toast.success).mockClear());

  it("is the #contact section with its fields", () => {
    render(<ContactForm />);
    expect(screen.getByTestId("contact").id).toBe("contact");
    for (const label of ["Name", "Email", "Message"]) {
      expect(screen.getByLabelText(label)).toBeInTheDocument();
    }
    expect(screen.getByRole("combobox", { name: "Topic" })).toHaveTextContent(
      "Pricing",
    );
  });

  it("shows errors and no toast when the form is empty or the email is bad", async () => {
    render(<ContactForm />);
    fireEvent.click(screen.getByRole("button", { name: "Send message" }));
    expect(await screen.findByText("Please enter your name.")).toBeVisible();
    expect(screen.getByText("Please enter a valid email address.")).toBeVisible();
    expect(screen.getByText("Please tell us how we can help.")).toBeVisible();

    fill("Name", "Ada");
    fill("Email", "not-an-email");
    fill("Message", "Hi");
    fireEvent.click(screen.getByRole("button", { name: "Send message" }));
    await waitFor(() =>
      expect(screen.queryByText("Please enter your name.")).toBeNull(),
    );
    expect(screen.getByText("Please enter a valid email address.")).toBeVisible();
    expect(toast.success).not.toHaveBeenCalled();
  });

  it("shows the toast and clears the form on a valid submit", async () => {
    render(<ContactForm />);
    fill("Name", "Ada Lovelace");
    fill("Email", "ada@example.com");
    fill("Message", "How much is Copper Plus?");
    fireEvent.click(screen.getByRole("button", { name: "Send message" }));

    await waitFor(() => expect(toast.success).toHaveBeenCalledWith(CONTACT_TOAST));
    expect(CONTACT_TOAST).toBe(
      "Copper State Labs has received your input and will get in touch soon.",
    );
    await waitFor(() => expect(screen.getByLabelText("Name")).toHaveValue(""));
    expect(screen.getByLabelText("Message")).toHaveValue("");
  });

  it("is on the home page, linked from the header", () => {
    render(<Home />);
    expect(screen.getByTestId("contact")).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Contact" }).getAttribute("href"),
    ).toBe("#contact");
  });
});
