import { useAuth } from "@/context/auth-context";
import apiClient from "@/services/api-client";
import { Button, Card, Input, message } from "antd";
import { useState } from "react";

export const Unauthorized = () => {
  const { setUserAuth } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const validateToken = async (token: string) => {
    try {
      const response = await apiClient.get("/", {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.status === 200;
    } catch (_error) {
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const formData = new FormData(e.currentTarget);
      const name = formData.get("name") as string;
      const token = formData.get("token") as string;
      const isValid = await validateToken(token);

      if (!isValid) {
        messageApi.open({
          type: "error",
          content: "Invalid API token. Please check and try again!",
        });
        return;
      }

      setUserAuth({
        name,
        token,
      });
      messageApi.open({
        type: "success",
        content: "API token validated. You are now authorized!",
      });
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error submitting form:", error);
        messageApi.open({
          type: "error",
          content: `There is an error: ${error.message}`,
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="min-h-screen flex flex-col gap-4 justify-center items-center">
      {contextHolder}

      <h1 className="text-lg text-balance text-center sm:w-3/4">
        You are unauthorized, please input your name and GoRest API token to
        continue
      </h1>
      <Card
        title="GoRest Blog Posts"
        className="w-5/6 sm:w-4/6 md:w-3/6 lg:w-2/6"
      >
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <Input name="name" placeholder="Your name" required />
          <Input.TextArea name="token" placeholder="API Token" required />
          <Button
            htmlType="submit"
            type="primary"
            loading={isLoading}
            className="mt-4 w-full"
          >
            Submit
          </Button>
        </form>
      </Card>
      <p>
        Get your GoRest API token{" "}
        <a
          href="https://gorest.co.in/my-account/access-tokens"
          className="text-blue-7 underline"
          target="_blank"
          rel="noreferrer noopener"
        >
          here
        </a>
      </p>
    </section>
  );
};
