import React from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';
import AppWitchRedux from "./AppWithRedux";
import {ReduxStoreProviderDecorator} from "../../Decorators/ReduxStoreProviderDecorator";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Todolist/AppWitchRedux',
    component: AppWitchRedux,
    decorators: [ReduxStoreProviderDecorator]
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes

} as ComponentMeta<typeof AppWitchRedux>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof AppWitchRedux> = (args) => <AppWitchRedux/>;

export const AppWitchReduxStory = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
AppWitchReduxStory.args = {};
