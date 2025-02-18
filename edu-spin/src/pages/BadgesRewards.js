import React, { useState, useEffect } from "react";
import "./../styles/BadgesRewards.css"; // Add styling for locked/unlocked badges

const badgesData = [
  { id: 1, name: "Beginner", scoreRequired: 100, image: "/images/beg.png" },
  { id: 2, name: "Intermediate", scoreRequired: 300, image: "/images/imid.png" },
  { id: 3, name: "Advanced", scoreRequired: 500, image: "/images/adv.png" },
];

const BadgesRewards = () => {
  const [score, setScore] = useState(0);
  const [unlockedBadges, setUnlockedBadges] = useState([]);

  useEffect(() => {
    const storedScore = localStorage.getItem("userScore") || 0;
    setScore(parseInt(storedScore));

    // Check which badges are unlocked
    const unlocked = badgesData.filter((badge) => storedScore >= badge.scoreRequired);
    setUnlockedBadges(unlocked.map((badge) => badge.id));
  }, []);

  return (
    <div className="badges-container">
      <h2>🎖️ Badges & Rewards</h2>
      <p>Your Score: {score}</p>
      <div className="badges-grid">
        {badgesData.map((badge) => (
          <div key={badge.id} className={`badge ${unlockedBadges.includes(badge.id) ? "unlocked" : "locked"}`}>
            <img src={badge.image} alt={badge.name} />
            <p>{badge.name}</p>
            {!unlockedBadges.includes(badge.id) && <span className="lock-icon">🔒</span>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BadgesRewards;
