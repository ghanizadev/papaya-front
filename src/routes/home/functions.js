import ip from 'ip';

export const getServer = () => {
    const result = ip.address();

    return result
        .split('.')
        .map(str => Number(str).toString(16))
        .join(':')
        .toUpperCase();
}