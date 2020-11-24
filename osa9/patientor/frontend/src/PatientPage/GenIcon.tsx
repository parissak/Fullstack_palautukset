import React from "react";
import { Icon } from "semantic-ui-react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const GenIcon: React.FC<{ genderIcon?: string; entryIcon?: any; healthRating?: number }> = ({ genderIcon, entryIcon, healthRating }) => {
    if (genderIcon) {
        const symbol = genderIcon === 'male' ? 'mars'
            : genderIcon === 'female' ? 'venus'
                : 'genderless';

        return <Icon name={symbol} />;
    }

    if (entryIcon) {
        return <Icon name={entryIcon} />;
    }

    if (healthRating || healthRating === 0) {
        const color = healthRating === 0 ? 'green'
            : healthRating === 1 || healthRating === 2 ? 'yellow'
                : 'red';

        return <Icon color={color} name='heart' />;
    }

    return null;
};

export default GenIcon; 