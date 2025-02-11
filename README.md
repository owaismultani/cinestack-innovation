# Cinestack Innovation

Cinestack Innovation is a web application that showcases trending movies using the TMDB API. This project is built with Next.js and styled with Tailwind CSS.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- You have installed Node.js and npm.
- You have a TMDB account to obtain an API key.

## Setup

Follow these steps to set up the project locally:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/owaismultani/cinestack-innovation.git
   cd cinestack-innovation
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Create a `.env` file:**

   Copy the `.env.example` file to `.env` and fill in your TMDB API key.

   ```bash
   cp .env.example .env
   ```

   Edit the `.env` file to include your TMDB API key:

   ```
   NEXT_PUBLIC_TMDB_API_KEY=your_tmdb_api_key
   ```

4. **Run the development server:**

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Obtaining the TMDB API Key

1. **Sign up for a TMDB account:**

   Visit [TMDB](https://www.themoviedb.org/) and create an account if you don't have one.

2. **Navigate to the API section:**

   Once logged in, go to your account settings and find the API section.

3. **Create an API key:**

   Follow the instructions to create a new API key. You will need to provide some basic information about your application.

4. **Copy the API key:**

   Once your API key is generated, copy it and paste it into your `.env` file as shown in the setup instructions.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [TMDB](https://www.themoviedb.org/) for providing the movie data.
- [Next.js](https://nextjs.org/) for the framework.
- [Tailwind CSS](https://tailwindcss.com/) for styling.
