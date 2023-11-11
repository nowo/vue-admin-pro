<template>
    <div class="layout-columns-aside">
        <el-scrollbar>
            <ul>
                <li>111</li>
            </ul>
        </el-scrollbar>
    </div>
</template>

<script setup lang="ts" name="layoutColumnsAside">

</script>

<style scoped lang="scss">
.layout-columns-aside {
    width: 70px;
    height: 100%;
    background: var(--next-bg-columnsMenuBar);

    ul {
        position: relative;

        .layout-columns-active,
        .layout-columns-active a {
            color: var(--next-bg-columnsMenuBarColor) !important;
            transition: 0.3s ease-in-out;
        }

        .layout-columns-hover {
            color: var(--el-color-primary);

            a {
                color: var(--el-color-primary);
            }
        }

        li {
            color: var(--next-bg-columnsMenuBarColor);
            width: 100%;
            height: 50px;
            text-align: center;
            display: flex;
            cursor: pointer;
            position: relative;
            z-index: 1;

            &:hover {
                @extend .layout-columns-hover;
            }

            .columns-vertical {
                margin: auto;

                .columns-vertical-title {
                    padding-top: 1px;
                }
            }

            .columns-horizontal {
                display: flex;
                height: 50px;
                width: 100%;
                align-items: center;
                padding: 0 5px;

                i {
                    margin-right: 3px;
                }

                a {
                    display: flex;

                    .columns-horizontal-title {
                        padding-top: 1px;
                    }
                }
            }

            a {
                text-decoration: none;
                color: var(--next-bg-columnsMenuBarColor);
            }
        }

        .columns-round {
            background: var(--el-color-primary);
            color: var(--el-color-white);
            position: absolute;
            left: 50%;
            top: 2px;
            height: 44px;
            width: 65px;
            transform: translateX(-50%);
            z-index: 0;
            transition: 0.3s ease-in-out;
            border-radius: 5px;
        }

        .columns-card {
            @extend .columns-round;
            top: 0;
            height: 50px;
            width: 100%;
            border-radius: 0;
        }
    }
}
</style>
