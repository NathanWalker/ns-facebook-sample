<template>
    <Page>
        <ActionBar>
            <Label text="Home"/>
        </ActionBar>

        <GridLayout>
            <Label class="info">
                <FormattedString>
                    <Span class="fas" text.decode="&#xf135; "/>
                    <Span :text="message"/>
                </FormattedString>
            </Label>
            <button text="Facebook" @tap="facebookLogin" />
        </GridLayout>
    </Page>
</template>

<script>
import { LoginManager } from '@nativescript/facebook';
import {
    firebase
} from '@nativescript/firebase-core';
import '@nativescript/firebase-analytics';
  export default {
    computed: {
      message() {
        return "Blank {N}-Vue app";
      }
    },
    methods: {

        async facebookLogin() {
            let vm = this;
            await LoginManager.logInWithPermissions(['public_profile']).then(profile => {
                console.log('profile', profile);
                if (profile.Id) {
                    vm.external = 'facebook';
                    vm.external_id = result.Id;
                    vm.first_name = result.ProfileDataFields.first_name;
                    vm.last_name = result.ProfileDataFields.last_name;
                    vm.email = result.ProfileDataFields.email;
                    vm.login(vm.external, {
                        external: vm.external,
                        id: vm.external_id
                    });
                } else {
                    try {
                        firebase().analytics().logEvent('log_error', {
                            'template': 'Login',
                            'code': 1,
                            'message': "Error while logging in to Facebook: " + e
                        });
                    } catch (e) {}
                }
            }).catch(e => {
                console.log('Facebook login error:', e);
                try {
                    firebase().analytics().logEvent('log_error', {
                        'template': 'Login',
                        'code': 2,
                        'message': "Error while logging in to Facebook: " + e
                    });
                } catch (e) {}
            });

        },
    }
  };
</script>

<style scoped lang="scss">
    @import '@nativescript/theme/scss/variables/blue';

    // Custom styles
    .fas {
        @include colorize($color: accent);
    }

    .info {
        font-size: 20;
        horizontal-align: center;
        vertical-align: center;
    }
</style>
