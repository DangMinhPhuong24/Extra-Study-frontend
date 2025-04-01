<template>
    <TheHeader />
    <div class="container-fuild mt-3">
        <div class="row">
            <div class="col-sm-3 d-none d-sm-flex">
                <a-list bordered style="width: 100%;">
                    <TheMenuStudent />
                    <template #header>
                        <div>Bảng điều khiển</div>
                    </template>
                </a-list>
            </div>

            <div class="col-12 col-sm-9">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>
<script>
import TheHeader from '../components/TheHeader.vue';
import TheMenuStudent from '../components/TheMenuStudent.vue';

export default {
    components: {
        TheHeader,
        TheMenuStudent
    }
}
</script>