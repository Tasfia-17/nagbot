export async function refreshTwitterToken(refreshToken: string): Promise<string | null> {
  try {
    const response = await fetch('https://api.twitter.com/2/oauth2/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${Buffer.from(`${process.env.TWITTER_CLIENT_ID}:${process.env.TWITTER_CLIENT_SECRET}`).toString('base64')}`,
      },
      body: new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token: refreshToken,
      }),
    });

    if (!response.ok) return null;

    const data = await response.json();
    return data.access_token;
  } catch (error) {
    console.error('Failed to refresh Twitter token:', error);
    return null;
  }
}

export async function postTweet(accessToken: string, text: string): Promise<boolean> {
  try {
    const response = await fetch('https://api.twitter.com/2/tweets', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text }),
    });

    return response.ok;
  } catch (error) {
    console.error('Failed to post tweet:', error);
    return false;
  }
}

export async function verifyGitHubCommit(repo: string, username: string, since: Date, until: Date): Promise<boolean> {
  try {
    const response = await fetch(
      `https://api.github.com/repos/${repo}/commits?author=${username}&since=${since.toISOString()}&until=${until.toISOString()}`
    );

    if (!response.ok) return false;

    const commits = await response.json();
    return commits.length > 0;
  } catch (error) {
    console.error('Failed to verify GitHub commit:', error);
    return false;
  }
}
