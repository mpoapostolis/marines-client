import React, { useContext } from "react";

export type Translate = (key: string) => string;

const I18n = React.createContext<Translate>((key) => key);

export const useI18n = () => useContext(I18n);

export default I18n;
