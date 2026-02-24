export const fetchOpenAIWithRetry = async (prompt: string, retries = 5) => {
    const delays = [1000, 2000, 4000, 8000, 16000];

    for (let i = 0; i < retries; i++) {
        try {
            const response = await fetch('/api/openai', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ prompt }),
            });

            if (!response.ok) {
                throw new Error(`API error: ${response.status}`);
            }

            const data = await response.json();
            if (data.error) {
                throw new Error(data.error);
            }
            return data.text;
        } catch (error) {
            if (i === retries - 1) throw error;
            await new Promise((resolve) => setTimeout(resolve, delays[i]));
        }
    }
};
